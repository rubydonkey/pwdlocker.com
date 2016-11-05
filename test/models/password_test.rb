require 'test_helper'

class PasswordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
    @password = Password.new(title: "Example", username: "ExampleUser", password: "ExamplePassword", URL: "www.example.com")
  end

end
