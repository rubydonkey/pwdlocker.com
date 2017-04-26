class PagesController < ApplicationController

  def index
    @passwords        = Password.includes(:favicon, :password_group)
  end

  def fuseSearch
  	 @passwords       = Password.all 
  end
end
