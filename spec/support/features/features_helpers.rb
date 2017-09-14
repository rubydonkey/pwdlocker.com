module Features
  module PasswordsHelpers
    def get_random_password_data
      data = Hash.new

      data[:title]    = Faker::Lorem.words(2).join(' ')
      data[:URL]      = Faker::Internet.url
      data[:username] = Faker::Internet.user_name
      data[:password] = Faker::Internet.password(6, 10)

      data
    end
  end

  module PasswordGroupsHelper
    def get_random_password_group_name
      data = Hash.new
      data[:name]  = Faker::Lorem.words(2).join(' ')
    end
  end

  module CapybaraDriver
    def inspect_in_chrome()
      Capybara.javascript_driver = :selenium_chrome
    end
  end
end

RSpec.configure do |config|
  config.include Features::PasswordsHelpers, :type => :feature
  config.include Features::PasswordGroupsHelper, :type => :feature
  config.include Features::CapybaraDriver, :type => :feature

end
