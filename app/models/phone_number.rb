require 'twilio-ruby'

class PhoneNumber < ApplicationRecord

  validates :number, presence: true, uniqueness: true

  validate :valid_number?
  before_validation :check_if_number_exists?
  before_destroy :temp

  private

  def valid_number?
    unless (number = validate_number)
      errors.add(:number, "invalid!")
    end
  end

  def validate_number
    # if number is empty return. active record presence validation will handle it
    return unless(number.present?)
    lookup_client = Twilio::REST::LookupsClient.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
    begin
      response = lookup_client.phone_numbers.get(number)
      return response.phone_number
    rescue => e
      if e.code == 20404
        return false
      else
        raise e
      end
    end
  end

  def check_if_number_exists?
    if(number = validate_number)
      phone = catch(:abort) do
        if(phone_number = PhoneNumber.where(:number => number).first)
          throw :abort, phone_number
        end
      end
      if(phone.present?)
        return phone
      end
    end
  end
end
