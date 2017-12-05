class PagesController < ApplicationController

  def index
    @passwords        = Password.includes(:favicon, :password_group)
    @password_groups  = PasswordGroup.all

    if current_user
      current_user.getData()
    end
  end
end
