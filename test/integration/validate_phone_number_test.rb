require 'test_helper'

class ValidatePhoneNumberTest < ActionDispatch::IntegrationTest
  
test "Invalid phone number" do
    get root_path
    assert_response :success
    assert_equal '/', path
    post "/signin/show", :phone_number => "+3816453" 
    assert_equal '/signin/show', path
    assert_select 'p', "You have entered wrong phone number format, please try again!"

  end

test "Phone number blank" do
    get root_path
    assert_response :success
    assert_equal '/', path
    post "/signin/show", :phone_number => "" 
    assert_equal '/signin/show', path
    assert_select 'p', "Empty phone number!"

  end

test "Valid phone number" do
    get root_path
    assert_response :success
    assert_equal '/', path
    post_via_redirect "/signin/secret_token", {"phone"=>'+381652932222', "national_format"=>"065 2932222", "country_code" => "RS"}
    assert_equal '/signin/secret_token', path
    assert_select 'p', "This page serves secret token for phone number: +381652932222"

  end

end
