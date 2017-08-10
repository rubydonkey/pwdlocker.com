require 'rails_helper'
require 'capybara/rspec'
require 'capybara/selenium/driver'
Capybara.javascript_driver = :selenium

RSpec.configure do |config|
  config.before(:suite) do
    `bin/webpack`
  end
end