require 'test_helper'

class PasswordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
    @password = Password.new(title: "Example", username: "ExampleUser", password: "ExamplePassword", URL: "www.example.com")
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

end
