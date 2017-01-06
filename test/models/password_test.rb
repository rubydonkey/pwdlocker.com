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

  test 'password_last_changed_at attribute updated only when password is changed' do
    @password.save
    assert_nil @password.password_last_changed_at
    @password.update_attribute(:password, "NewPassword")
    assert_not_nil @password.password_last_changed_at
  end

  test 'password_last_changed_at attribute not updated when any other attribute from password is changed' do
    @password.save
    assert_nil @password.password_last_changed_at
    @password.update_attribute(:title, "NewTitle")
    assert_nil @password.password_last_changed_at
  end

end
