module ApplicationHelper

  def full_title(title = "")
    base_title = "pwdlocker.com"
    if(title.empty?)
      base_title
    else
      title + " | " + base_title
    end
  end

end
