class SessionsController < ApplicationController

  def create
    id = session[:phone_number_id];
    if(id.present?)
      token = params[:session][:token]
      @phone_number = PhoneNumber.find(id)
      auth_ret = @phone_number.authenticate(token)
      if(auth_ret == PhoneNumber::TOKEN_VALID)
        # token ok
      elsif(auth_ret == PhoneNumber::TOKEN_INVALID)
        # token invalid
      else
        # token expired
      end
    end
  end

end
