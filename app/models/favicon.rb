class Favicon < ApplicationRecord
  has_many :passwords, dependent: :nullify

  validates :host, :data, presence: true
end
