class ConfigVar < ApplicationRecord
  belongs_to :user
  has_many :applications
  validates :name, presence: true

  after_initialize :set_flags

  attr_accessor :is_created
  attr_accessor :is_updated
  attr_accessor :is_deleted
  attr_accessor :applications_names


  def set_flags
    @is_created = false
    @is_updated = false
    @is_deleted = false
    @applications_names = []
  end

  def as_json(options = nil)
    super({include: [:user, :applications], methods: [:isCreated, :isUpdated, :isDeleted]}.merge(options || {}))
  end
end
