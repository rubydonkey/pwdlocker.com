class PasswordGroup < ApplicationRecord
  has_many :passwords
  validates :name, presence: true
  validates_uniqueness_of :name, :message => " has already been taken!"
  
end
