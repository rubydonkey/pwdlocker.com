require 'test_helper'

class ValidatePhoneNumberTest < ActionDispatch::IntegrationTest
  INVALID_PHONE_NUMBER = "+3816453"
  VALID_PHONE_NUMBERS = ["+381640347000", "381640347000", "+381(64)034-7000", "+381 64 034 70 00"]

  def setup
    Twilio::REST::Messages.any_instance.stubs(:create)
  end

  test "Invalid phone number" do
    get signin_path

    assert_response :success
    assert_equal signin_path, path
    post "/signin/show", params: {:phone_number => INVALID_PHONE_NUMBER}
    assert_equal '/signin/show', path
    assert_select 'p', I18n.t('phone_number.invalid')
    assert_select 'input[value=?]', INVALID_PHONE_NUMBER
  end

  test "Phone number blank" do
    get signin_path
    assert_response :success
    assert_equal signin_path, path
    post "/signin/show", params: {:phone_number => ""}
    assert_equal '/signin/show', path
    assert_select 'p', I18n.t('phone_number.blank')

  end

  VALID_PHONE_NUMBERS.each_with_index do |phone_number, i|
    test "Valid phone number #{i}" do
      get signin_path
      assert_response :success
      assert_equal signin_path, path
      post "/signin/show", params: {"phone_number" => phone_number}

      follow_redirect!

      assert_equal '/signin/secret_token', path
      assert_select 'input.disabled[value=?]', '+381640347000'

    end
  end

  test 'Getting secret token page without phone number' do
    get '/signin/secret_token'
    follow_redirect!

    assert_equal signin_path, path
  end
end
