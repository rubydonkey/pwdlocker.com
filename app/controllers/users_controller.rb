class UsersController < ApplicationController

  def index
    if(current_user)
      @user = current_user
      @user.getData
    end
    render json: @user
  end

end
