require 'test_helper'

class SigninsControllerTest < ActionDispatch::IntegrationTest

  def setup
    Twilio::REST::Messages.any_instance.stubs(:create)
  end

  test "should get new" do
    get new_signin_path
    assert_response :success
  end

  test "should get new AJAX" do
    get new_signin_path, xhr: true
    assert_response :success
  end

  test 'should create valid phone number' do

    skip('SID missing - unable to test')

    assert_difference 'PhoneNumber.count' do
      post signins_path, xhr: true, params: { phone_number: { number: '+381608449690'} }
    end
    assert_not_nil PhoneNumber.last.token_digest
    assert_not_nil session[:phone_number_id]
  end

  test 'should not create invalid phone number' do

    skip('SID missing - unable to test')

    assert_no_difference 'PhoneNumber.count' do
      post signins_path, xhr: true, params: { phone_number: { number: '0000' }}
    end
  end

  test 'should not create duplicate number' do

    skip('SID missing - unable to test')

    assert_no_difference 'PhoneNumber.count' do
      post signins_path, xhr: true, params: { phone_number: { number: phone_numbers(:one).number} }
    end
  end

  test 'resend token' do

    skip('SID missing - unable to test')

    phone_number = phone_numbers(:one)

    post signins_path, xhr: true, params: { phone_number: { number: phone_number.number } }
    assert_not_nil session[:phone_number_id]
    phone_number.reload
    token_digest = phone_number.token_digest
    post resend_token_signins_path
    phone_number.reload
    assert_not_equal token_digest, phone_number.token_digest
  end

end
