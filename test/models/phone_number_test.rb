require 'test_helper'

class PhoneNumberTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  INVALID_PHONE_NUMBER = "+3816453"
  VALID_PHONE_NUMBERS = ["+381640347000", "381640347000", "+381(64)034-7000", "+381 64 034 70 00"]

  def setup
    @phone_number = phone_numbers(:one)
  end

  test 'phone number is valid' do
    assert @phone_number.valid?
  end

  test 'number must be present' do
    @phone_number.number = " " * 5
    assert_not @phone_number.valid?
  end

  test 'number have to be valid' do
    @phone_number.number = INVALID_PHONE_NUMBER
    assert_not @phone_number.valid?
  end

  test 'number have to be unique' do
    phone_number_dup = @phone_number.dup
    @phone_number.save
    assert_not phone_number_dup.valid?

    #test taken method - should return true
    assert phone_number_dup.taken?
  end

  test 'number have to be reformatted in canonical form' do

    # this will call validation callbacks and reformat number in canonical form
    @phone_number.number = VALID_PHONE_NUMBERS[0]
    @phone_number.valid?
    number = @phone_number.number

    VALID_PHONE_NUMBERS.each do |valid|
      @phone_number.number = valid
      assert @phone_number.valid? # valid? will also trigger validation callbacks
      assert_equal number, @phone_number.number
    end
  end

  test 'sending token' do

    token = @phone_number.get_token

    Twilio::REST::Messages.any_instance.expects(:create).with(
        has_entries(
            body: "#{token} is your secret code",
            from: SigninController::TWILIO_PHONE_NUMBER,
            to: @phone_number.number
        )
    )

    @phone_number.send_token(token)

  end

  test 'authentication via token' do

    token = @phone_number.get_token
    @phone_number.send_token(token)
    assert @phone_number.authenticate(token)
  end

end
