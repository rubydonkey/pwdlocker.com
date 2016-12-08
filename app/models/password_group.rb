class PasswordGroup < ApplicationRecord
  has_many :passwords
  validates :name, presence: true
  
end
