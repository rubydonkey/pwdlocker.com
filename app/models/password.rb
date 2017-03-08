class Password < ApplicationRecord

  belongs_to :password_group, optional: true

  validates :title, presence: true
  validates :username, presence: true
  validates :password, presence: true

  default_scope -> { order(title: :asc) }

  belongs_to :favicon, optional: true

  before_update :update_password_last_changed, if: :password_changed?

  # validates :URL, presence: true, format: { with: URI::DEFAULT_PARSER.regexp[:ABS_URI] }

  def favicon_URI
    favicon.try(:host)
  end

  def favicon_DataURI
    favicon.try(:data)
  end

  def timestamp
    if(password_last_changed_at.present?)
      password_last_changed_at.strftime("%b %d, %Y %H:%M:%S GMT")
    else
      created_at.strftime("%b %d, %Y %H:%M:%S GMT")
    end
  end
  
  def as_json(options = nil)
    super({ include: [:favicon, :password_group], methods: [:timestamp] }.merge(options || {}))
  end

  def to_json(options={})
    super(options.merge(methods: :timestamp))
  end

  private

  def update_password_last_changed
    write_attribute(:password_last_changed_at, Time.now.utc.localtime)
  end


end
