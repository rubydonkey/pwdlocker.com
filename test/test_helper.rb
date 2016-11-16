ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'capybara/rails'


require 'capybara/poltergeist'

Capybara.default_driver = :poltergeist

class ActionDispatch::IntegrationTest
  # Make the Capybara DSL available in all integration tests
  include Capybara::DSL

  # Reset sessions and driver between tests
  # Use super wherever this method is redefined in your individual test classes
  def teardown
    Capybara.reset_sessions!
    Capybara.use_default_driver
  end
end

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...

  def get_random_password_data

    data = Hash.new

    data[:title]    = Faker::Lorem.words(2).join(' ')
    data[:URL]      = Faker::Internet.url
    data[:username] = Faker::Internet.user_name
    data[:password] = Faker::Internet.password(6, 10)

    data

  end


  VALID_URLS = %w[  http://www.altpress.org/
                    http://www.nzfortress.co.nz
                    http://www.evillasforsale.com
                    http://www.playingenemy.com/
                    http://www.richardsonscharts.com
                    http://www.xenith.net
                    http://www.tdbrecords.com
                    http://www.electrichumanproject.com/
                    http://tweekerchick.blogspot.com/
                    http://www.besound.com/pushead/home.html ]

  INVALID_URLS   = %w[  http://
                          http://.
                          http://..
                          http://../
                          http://?
                          http://??
                          http://??/
                          http://#
                          http://##
                          http://##/
                          http://foo.bar?q=Spaces should be encoded
                          //
                          //a
                          ///a
                          ///
                          http:///a
                          foo.com
                          rdar://1234
                          h://test
                          http:// shouldfail.com
                          :// should fail
                          http://foo.bar/foo(bar)baz quux
                          ftps://foo.bar/
                          http://-error-.invalid/
                          http://a.b--c.de/
                          http://-a.b.co
                          http://a.b-.co
                          http://0.0.0.0
                          http://10.1.1.0
                          http://10.1.1.255
                          http://224.1.1.1
                          http://1.1.1.1.1
                          http://123.123.123
                          http://3628126748
                          http://.www.foo.bar/
                          http://www.foo.bar./
                          http://.www.foo.bar./
                          http://10.1.1.1 ]





end
