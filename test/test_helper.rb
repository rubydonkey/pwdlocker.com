ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...

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
