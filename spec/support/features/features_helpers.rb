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

  module WaitForAjax
    def wait_for_ajax
      Timeout.timeout(Capybara.default_max_wait_time) do
        loop until finished_all_ajax_requests?
      end
    end

    def finished_all_ajax_requests?
      page.evaluate_script('jQuery.active').zero?
    end
  end
end

RSpec.configure do |config|
  config.include Features::PasswordsHelpers, :type => :feature
  config.include Features::PasswordGroupsHelper, :type => :feature
  config.include Features::WaitForAjax, :type => :feature
end