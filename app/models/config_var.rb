class ConfigVar < ApplicationRecord
  belongs_to :user
  has_many :applications
  validates :name, presence: true
end
