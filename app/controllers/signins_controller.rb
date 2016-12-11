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
        @phone_number.skip_callback(:all)
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
