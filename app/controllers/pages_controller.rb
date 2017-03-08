class PagesController < ApplicationController

  def index
<<<<<<< HEAD
    @passwords = Password.includes(:favicon, :password_group)
  end 
 
=======
    @passwords        = Password.includes(:favicon, :password_group)
  end

>>>>>>> ca001583b7aa6aae0a7bc431fe9ee43af3d476cb
end
