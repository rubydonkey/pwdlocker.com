class PasswordsController < ApplicationController

  before_action :get_all_passwords, only: [:create, :update, :destroy]

  def new
    @password = Password.new

    respond_to do |format|
      format.js
    end

  end

  def create
    @password = Password.create(password_params)

    respond_to do |format|
      format.js
    end

  end

  def edit
    @password = Password.find(params[:id])

    respond_to do |format|
      format.js
    end

  end

  def update
    @password = Password.find(params[:id])
    @password.update_attributes(password_params)

    respond_to do |format|
      format.js
    end

  end

  def destroy
    @password = Password.find(params[:id])
    @password.destroy

    respond_to do |format|
      format.js
    end

  end

  private

  def password_params
    params.require(:password).permit(:title, :URL, :username, :password)
  end

  def get_all_passwords
    @passwords = Password.all
  end

end
