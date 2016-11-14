class SigninController < ApplicationController
  
   skip_before_action :verify_authenticity_token, :only => [:show]

   def new
   end

   def show
   	  @phone_number = params[:phone_number]
      
   	 
      if valid?(@phone_number)
      	redirect_to signin_secret_token_path
      else
      	render 'new'
      end
   end

   def secret_token 
     
   end

  private

    def valid?(phone_number)
      @lookup_client = Twilio::REST::LookupsClient.new(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    # Do not submit to twilio at all, if blank 
     if phone_number.blank?
        @blank = true
        return false
     else
        @response = @lookup_client.phone_numbers.get(phone_number)
        @response.phone_number #if invalid, throws an exception. If valid, no problems.
        return true
     end
       
       rescue => e
       if e.code == 20404
       	@error = true
        return false
       else
         raise e 
       end
     #end  
   end

end
