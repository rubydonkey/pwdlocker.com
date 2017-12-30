class UsersController < ApplicationController

  def index
    if(current_user)
      @user = current_user
      @user.syncData
    end
    render :json => @user.as_json(include: { config_vars: { include: :applications }})
  end

end
