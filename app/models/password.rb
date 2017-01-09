class Password < ApplicationRecord

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

  private

  def update_password_last_changed
    write_attribute(:password_last_changed_at, Time.now.utc.localtime)
  end

end
