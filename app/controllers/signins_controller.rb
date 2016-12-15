class SigninsController < ApplicationController
  def new
    respond_to do |format|
      format.html
      format.js { @phone_number = PhoneNumber.new }
    end
  end

  def create
    respond_to do |format|
      format.js {
        @phone_number = PhoneNumber.create(phone_number_params)
        if(@phone_number.taken?)
          @phone_number = PhoneNumber.where(:number => @phone_number.number).first
        end
        if(@phone_number.errors.empty?)
          @phone_number.send_token
          session[:phone_number_id] = @phone_number.id
        end
      }
    end
  end

  def show
  end
  
  private

  def phone_number_params
    params.require(:phone_number).permit(:number)
  end
end
