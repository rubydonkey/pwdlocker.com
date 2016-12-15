require 'twilio-ruby'
require 'base64'
require 'digest/sha2'


class PhoneNumber < ApplicationRecord
  TWILIO_PHONE_NUMBER = '17032910306'


  validates :number, presence: true, uniqueness: true
  before_validation :validate_number

  def taken?
    # if uniqueness error present number already exist in database
    if errors.any?
      errors.details[:number][0][:error] == :taken
    end
  end

  def send_token(token = get_token)
    generate_token_digest(token)
    twilio_client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
    twilio_client.account.messages.create(
                                            :from =>  TWILIO_PHONE_NUMBER,
                                            :to =>    self.number,
                                            :body =>  "#{token} is your secret code"
                                          )
  end

  def get_token
    token = SecureRandom.random_number
    token = token * (10 ** 8)
    token = token.round.to_s.rjust(8, "0")
  end

  def authenticate(token)
    salted_hash_bytes = Base64::decode64(self.token_digest)
    salt_bytes = salted_hash_bytes[0..7]
    hash_bytes = salted_hash_bytes[8..39]
    hash_bytes == Digest::SHA256.digest(salt_bytes+token)
  end

  private

  def generate_token_digest(token)
    salt_bytes = random_salt
    salted_hash_bytes = Digest::SHA256.digest(salt_bytes+token)
    update_attribute(:token_digest, Base64::encode64(salt_bytes+salted_hash_bytes))
  end

  def random_salt
    random = File.new('/dev/random', 'r')
    random.read(16) #discrard first 16 bytes
    salt = random.read(8)
    random.close
    salt
  end

  def validate_number
    # if number is empty return. active record presence validation will handle it
    return unless(self.number.present?)
    lookup_client = Twilio::REST::LookupsClient.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
    begin
      response = lookup_client.phone_numbers.get(self.number)

      # if number valid twillo self.number will be reformatted to canonical form
      # this is required in order to all valid same numbers be saved with same value
      # if invalid number will remain unchanged and in rescue error is added
      self.number = response.phone_number
    rescue => e
      if e.code == 20404
        errors.add(:number, 'invalid!')
      else
        raise e
      end
    end
  end

end
