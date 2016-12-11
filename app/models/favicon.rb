class Favicon < ApplicationRecord
  has_many :passwords

  validates :host, :data, presence: true
end
