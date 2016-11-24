require 'twilio-ruby'
require 'securerandom'


class SigninController < ApplicationController

  skip_before_action :verify_authenticity_token, :only => [:show]

  def new
  end

  def show
  	if phone_number = valid?(params[:phone_number])
      session[:phone_number] = phone_number
      token = SecureRandom.random_number * (10**8)
      twilio_phone_number = "+17032910306"
      @twilio_client = Twilio::REST::Client.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
      @twilio_client.account.sms.messages.create(
      :from => "#{twilio_phone_number}",
      :to => phone_number,
      :body => " #{token.round.to_s}"
      )
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
    @lookup_client = Twilio::REST::LookupsClient.new(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])

    # Do not submit to twilio at all, if blank
    if phone_number.blank?
      @blank = true
      return false
    else
      @response = @lookup_client.phone_numbers.get(phone_number)
      return @response.phone_number #if invalid, throws an exception. If valid, no problems.
    end
  rescue => e
    if e.code == 20404
     	@error = true
      return false
    else
       raise e
    end
  end

end
