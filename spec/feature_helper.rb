require 'rails_helper'
require 'capybara/rspec'
require 'capybara/poltergeist'

Capybara.register_driver :selenium_chrome do |app|

    Capybara::Selenium::Driver.new(
        app,
        browser: :chrome
    )
end

Capybara.register_driver :selenium_chrome_headless do |app|

    capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
        chromeOptions: { args: %w[headless disable-gpu] }
    )
    Capybara::Selenium::Driver.new(
        app,
        browser: :chrome,
        desired_capabilities: capabilities
    )
end

Capybara.register_driver :poltergeist_debug do |app|
  Capybara::Poltergeist::Driver.new(app, :inspector => true)
end

Capybara.configure do |config|
  config.default_max_wait_time = 10 # seconds
  config.default_driver        = :selenium_chrome_headless
end

Capybara.javascript_driver = :selenium_chrome_headless

RSpec.configure do |config|
  config.before(:suite) do
    `bin/webpack`
  end
end