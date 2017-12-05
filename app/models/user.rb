class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :rememberable, :trackable, :omniauthable,
         :omniauth_providers => [:heroku]

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      token = auth.credentials.token
    end
  end

  def getData
    @heroku = PlatformAPI.connect_oauth(token)
  end
end
