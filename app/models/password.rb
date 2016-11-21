class Password < ApplicationRecord

  require 'uri'

  validates :title, presence: true
  validates :username, presence: true
  validates :password, presence: true, length: {minimum: 6}

  default_scope -> { order(title: :asc) }

  VALID_URL_REGEX = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ix

end
