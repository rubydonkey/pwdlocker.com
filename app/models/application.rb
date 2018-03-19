class Application < ApplicationRecord
  belongs_to :config_var
  validates :name, presence: true
end
