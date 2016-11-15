require 'test_helper'

class ValidatePhoneNumberTest < ActionDispatch::IntegrationTest

test "Invalid phone number" do
    get root_path
    assert_response :success
    assert_equal '/', path
    post "/signin/show", params: {:phone_number => "+3816453"}
    assert_equal '/signin/show', path
    assert_select 'p', "You have entered wrong phone number format, please try again!"

  end

test "Phone number blank" do
    get root_path
    assert_response :success
    assert_equal '/', path
    post "/signin/show", params: {:phone_number => ""}
    assert_equal '/signin/show', path
    assert_select 'p', "Empty phone number!"

  end

  ["+381652932222", "381652932222", "+381(65)293-2222", "+381 65 293 22 22"].each_with_index do |phone_number, i|
    test "Valid phone number #{i}" do
        get root_path
        assert_response :success
        assert_equal '/', path
        post "/signin/show", params: {"phone_number" => phone_number}

        follow_redirect!

        assert_equal '/signin/secret_token', path
        assert_select 'p', "This page serves secret token for phone number: +381652932222"

      end
  end
end
