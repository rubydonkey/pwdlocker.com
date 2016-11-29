require 'test_helper'

class PasswordTest < ActiveSupport::TestCase
  def setup
    @data = get_random_password_data
    @data[:URL] = "www.pwdlocker.com"
    @password = Password.new(@data)
  end

  test 'password should be valid' do
    assert @password.valid?
  end

  test 'password should be present' do
    @password.password = " " * 5
    assert_not @password.valid?
  end

  test 'title should be present' do
    @password.title = " " * 5
    assert_not @password.valid?
  end

  test 'username should be present' do
    @password.username = " " * 5
    assert_not @password.valid?
  end

  test 'scheme should be added if does not exist in input url' do
    url = "www.pwdlocker.com"
    @password.save
    @password.reload
    assert_not_equal @data[:URL].to_s, @password.URL.to_s
    assert_not_nil URI.parse(@password.URL).scheme
  end

  test 'test favicon related columns' do
    favicon = Favicon.new(@data[:URL])
    @password.save
    @password.reload
    assert_equal @password.favicon_URI, favicon.uri
    assert_equal @password.favicon_DataURI, favicon.base64
  end

end
