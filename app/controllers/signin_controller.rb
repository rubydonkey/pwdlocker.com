require 'twilio-ruby'
require 'securerandom'

class SigninController < ApplicationController
  INVALID_PHONE_NUMBER_CODE = 20404

  TWILIO_PHONE_NUMBER = '17032910306'

  skip_before_action :verify_authenticity_token, :only => [:show]

  def new
  end

  def show
    if phone_number = valid?(params[:phone_number])
      session[:phone_number] = phone_number
      token = generate_token
      send_token_to_phone_number(token, phone_number)

    	redirect_to signin_secret_token_path()
    else
    	render 'new'
    end
  end

  def secret_token
    @phone_number = session[:phone_number]
    redirect_to signin_path unless @phone_number
  end

  private

  def valid?(phone_number)
    lookup_client = Twilio::REST::LookupsClient.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])

    # Do not submit to twilio at all, if blank
    if phone_number.blank?
      @blank = true
      return false
    else
      response = lookup_client.phone_numbers.get(phone_number)
      return response.phone_number #if invalid, throws an exception. If valid, no problems.
    end
  rescue => e
    if e.code == INVALID_PHONE_NUMBER_CODE
     	@error = true
      return false
    else
       raise e
    end
  end

  def generate_token(rnd = SecureRandom.random_number)
    token =  rnd * (10**8)
    token.round.to_s.rjust(8, "0")
  end

  def send_token_to_phone_number(token, phone_number)
    twilio_client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
    twilio_client.account.messages.create(
      :from =>  TWILIO_PHONE_NUMBER,
      :to =>    phone_number,
      :body =>  "#{token} is your secret code"
    )
  end

end
