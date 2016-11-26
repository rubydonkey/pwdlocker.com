require 'favicon'
module PasswordsHelper

  def get_favicon_url(password)
    favicon = Favicon.new(password.URL)
    favicon.base64
  end

end
