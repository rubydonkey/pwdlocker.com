class PagesController < ApplicationController

  def index
    @passwords        = Password.includes(:favicon, :password_group)
    @password_groups  = PasswordGroup.all
  end

end
