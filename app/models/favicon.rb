class Favicon < ApplicationRecord
  has_many :passwords, dependent: :nullify

  validates :host, :data, presence: true

  def as_json(options = nil)
    super({only: [:data]}.merge(options || {}))
  end 

end
