class PasswordGroup < ApplicationRecord
  has_many :passwords
  validates :name, presence: true
  validates_uniqueness_of :name, :message => " has already been taken!"
  
  def as_json(options = nil)
    super({ only: [:id, :name]}.merge(options || {}))
  end

end
