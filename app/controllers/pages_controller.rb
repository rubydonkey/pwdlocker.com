class PagesController < ApplicationController

  def index
    @passwords = Password.all    
  end

end