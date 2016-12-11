class Password < ApplicationRecord
  validates :title, presence: true
  validates :username, presence: true
  validates :password, presence: true

  default_scope -> { order(title: :asc) }

  belongs_to :favicon, optional: true

  # validates :URL, presence: true, format: { with: URI::DEFAULT_PARSER.regexp[:ABS_URI] }

  def favicon_URI
    favicon.try(:host)
  end

  def favicon_DataURI
    favicon.try(:data)
  end
end
