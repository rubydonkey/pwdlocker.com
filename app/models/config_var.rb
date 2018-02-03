class ConfigVar < ApplicationRecord
  belongs_to :user
  has_many :applications
  validates :name, presence: true

  after_initialize :set_flags

  attr_accessor :isCreated
  attr_accessor :isUpdated
  attr_accessor :isDeleted

  def set_flags
    @isCreated = false
    @isUpdated = false
    @isDeleted = false
  end

end
