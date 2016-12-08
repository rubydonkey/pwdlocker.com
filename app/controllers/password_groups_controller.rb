class PasswordGroupsController < ApplicationController

  def index
  	@password_groups = PasswordGroup.all
  end

  def new
    @password_group= PasswordGroup.new

    respond_to do |format|
      format.js
    end
  end


  def create
    @password_group = PasswordGroup.create(password_group_params)

    respond_to do |format|
      format.js
    end
  end

  private

  def password_group_params
    params.require(:password_group).permit(:name)
  end

end
