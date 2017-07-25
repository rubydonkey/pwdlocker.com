class PasswordGroupsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def get_all
    @password_groups = PasswordGroup.all
    render json: @password_groups
  end

  def create
    @password_group = PasswordGroup.create(password_group_params)

    respond_to do |format|
      format.json do
        if @password_group.save
          render :json => @password_group.as_json({only: [:id, :name]});
        else
          render :json => { :errors => @password_group.errors.messages }, :status => 422
        end
      end
    end
  end

  private

  def password_group_params
    params.require(:password_group).permit(:name)
  end

end
