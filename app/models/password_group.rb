class PasswordGroup < ApplicationRecord
  has_many :passwords
  validates :name, presence: true

  def as_json(options = nil)
    super({ only: [:name]}.merge(options || {}))
  end
  
end
