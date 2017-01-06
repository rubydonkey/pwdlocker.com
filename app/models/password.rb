class Password < ApplicationRecord

  include ActiveModel::Dirty

  validates :title, presence: true
  validates :username, presence: true
  validates :password, presence: true

  default_scope -> { order(title: :asc) }

  belongs_to :favicon, optional: true

  before_update :set_password_last_changed, if: :password_changed?


  # validates :URL, presence: true, format: { with: URI::DEFAULT_PARSER.regexp[:ABS_URI] }

  def favicon_URI
    favicon.try(:host)
  end

  def favicon_DataURI
    favicon.try(:data)
  end

  def is_updated?
    self.created_at != self.updated_at
  end

  def set_password_last_changed
    write_attribute(:password_last_changed_at, Time.now.utc.localtime)
  end

end
