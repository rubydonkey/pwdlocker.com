require 'test_helper'

class SigninControllerTest < ActionController::TestCase
  def setup
    @token = @controller.send(:generate_token)
  end

  test 'it generates secret token 8 digits long' do
    assert_equal 8, @token.length
  end

  test 'it generates secret token with only alpha chars' do
    refute @token.match(/[A-Za-z]/)
  end

  test 'it does not generate same token twice' do
    refute_equal @token, @controller.send(:generate_token)
  end

  test 'it sends sms message with secret token in it' do
    phone_number = "+381640347000"
    Twilio::REST::Messages.any_instance.expects(:create).with(
      has_entries(
        body: "#{@token} is your secret code",
        from: SigninController::TWILIO_PHONE_NUMBER,
        to: phone_number
      )
    )

    @controller.send(:send_token_to_phone_number, @token, phone_number)
  end
end
