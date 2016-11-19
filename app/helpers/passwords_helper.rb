require 'uri'
module PasswordsHelper

  def get_favicon_url(password)
    url = password.URL
    if(!URI.parse(url).scheme)
      url = "https://#{url}"
    end
    "#{URI.parse(url).to_s}/favicon.ico"
  end

end
