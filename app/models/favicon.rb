class Favicon < ApplicationRecord
  has_many :passwords, dependent: :nullify

  validates :host, :data, presence: true
<<<<<<< HEAD

  def as_json(options = nil)
    super({only: [:data]}.merge(options || {}))
  end 

=======
  
  def as_json(options = nil)
    super({only: [:data]}.merge(options || {}))
  end 
  
>>>>>>> ca001583b7aa6aae0a7bc431fe9ee43af3d476cb
end
