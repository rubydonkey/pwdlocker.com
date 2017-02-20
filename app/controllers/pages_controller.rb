class PagesController < ApplicationController

  def index
    @passwords        = Password.all.includes(:favicon, :password_group)
    @password_groups  = Array.new()
    @favicon_URIs     = Array.new()
    @timestamps       = Array.new()

    @passwords.each do |pwd|
      @password_groups.push(pwd.password_group.try(:name))
      @favicon_URIs.push(pwd.favicon_DataURI)

      if(pwd.password_last_changed_at.present?)
        @timestamps.push(pwd.password_last_changed_at.strftime("%b %d, %Y %H:%M:%S GMT"))
      else
        @timestamps.push(pwd.created_at.strftime("%b %d, %Y %H:%M:%S GMT"))
      end
    end
  end

end
