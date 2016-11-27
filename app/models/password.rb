require 'uri'
require 'favicon'

class Password < ApplicationRecord
  before_save :check_url
  before_update :check_url

  validates :title, presence: true
  validates :username, presence: true
  validates :password, presence: true

  default_scope -> { order(title: :asc) }

  VALID_URL_REGEX = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ix
  # validates :URL, presence: true, format: { with: URI::DEFAULT_PARSER.regexp[:ABS_URI] }

  private

  def check_url
    uri = URI.parse(self.URL)
    if(!uri.scheme)
      self.URL = "http://#{self.URL}"
    end
    get_favicon_uri
  end

  def get_favicon_uri
    favicon = Favicon.new(self.URL)
    self.favicon_URI = favicon.uri
    self.favicon_DataURI = favicon.base64
  end

end
