require 'test_helper'

class PhoneNumberTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  INVALID_PHONE_NUMBER = "+3816453"
  VALID_PHONE_NUMBERS = ["+381640347000", "381640347000", "+381(64)034-7000", "+381 64 034 70 00"]

  def setup
    @phone_number = PhoneNumber.new(number: VALID_PHONE_NUMBERS[0])
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
  end

end
