class Password < ApplicationRecord

  require 'uri'

  validates :title, presence: true
  validates :username, presence: true
  validates :password, presence: true, length: {minimum: 6}

  VALID_URL_REGEX =
  validates :URL, presence: true, format: { with: URI::DEFAULT_PARSER.regexp[:ABS_URI] }

end
