class SigninController < ApplicationController
  
    skip_before_filter :verify_authenticity_token, :only => [:show]
 
   def valid?(phone_number)
     lookup_client = Twilio::REST::LookupsClient.new(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
     begin
       response = lookup_client.phone_numbers.get(phone_number)
       response.phone_number #if invalid, throws an exception. If valid, no problems.
       return true
       rescue => e
       if e.code == 20404
        return false
       else
        raise e
       end
     end  
   end

   def new
   end

   def show
   	  phone_number = params[:phone_number]

   	  #@code = response.country_code

      if valid?(phone_number)
      	render 'secret_token'
      else
      	 render 'new'
      end
   end

   def secret_token
   end
end
