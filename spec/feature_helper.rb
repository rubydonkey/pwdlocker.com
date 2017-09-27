require 'rails_helper'
require 'capybara/rspec'

Capybara.register_driver :selenium_chrome do |app|

    Capybara::Selenium::Driver.new(
        app,
        browser: :chrome
    )
end

Capybara.register_driver :selenium_chrome_headless do |app|

    capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
        chromeOptions: {
           args: %w[headless disable-gpu window-size=1920,1080]
        }
    )
    Capybara::Selenium::Driver.new(
        app,
        browser: :chrome,
        desired_capabilities: capabilities
    )
end

Capybara.configure do |config|
  config.default_max_wait_time = 30 # seconds
  config.default_driver        = :selenium_chrome_headless
end

Capybara.javascript_driver = :selenium_chrome_headless
