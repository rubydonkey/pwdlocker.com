class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  require 'twilio-ruby'
  TWILIO_ACCOUNT_SID = 'AC095898840ab7eb70803cfe36027f610d'
  TWILIO_AUTH_TOKEN = '85cefdfdf75c508fd9db4b88a53f2e0b'

end
