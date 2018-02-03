class User < ApplicationRecord
  has_many :config_vars
  has_many :applications

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :rememberable, :trackable, :omniauthable,
         :omniauth_providers => [:heroku]

  def self.from_omniauth(auth)
    @user = where(provider: auth.provider, uid: auth.uid).first_or_create
    @user.update_attribute(:token, auth.credentials.token)
    @user
  end

  def syncData
    @heroku = PlatformAPI.connect_oauth(token)
    heroku_apps = @heroku.app.list

    heroku_apps.each do |heroku_application|
      # here are flags showing which of the users configs are related with current app
      # this array used to find users vars that are not related with this app anymore
      config_application = Array.new(config_vars.count, false)

      heroku_application_name = heroku_application['name']

      # add applications to the user if not exists
      application = applications.find_by(name: heroku_application_name)
      if application.nil?
        applications.create(name: heroku_application_name)
      end

      heroku_config_vars = @heroku.config_var.info_for_app(heroku_application_name)
      heroku_config_vars.each do |heroku_config_var|
        config_var = config_vars.find_by(name: heroku_config_var[0], value: heroku_config_var[1])
        if config_var.nil?
          # add new config_vars if doesn`t exists and make association with app
          config_var = config_vars.create(name: heroku_config_var[0], value: heroku_config_var[1])
          config_var.applications.create(name: heroku_application_name, url: get_app_url(heroku_application_name))
          config_application.push(true)
        else
          unless config_var.applications.find_by(name: heroku_application_name)
            # existing config_var found in new app. Make association with app
            config_var.applications.create(name: heroku_application_name, url: get_app_url(heroku_application_name))
          end
          config_application[config_var.id - 1] = true
        end
      end

      # some of the config_vars does not belongs to this heroku_application anymore
      config_vars.each do |config_var|
        # if this config not found in heroku_config for current app
        unless config_application[config_var.id - 1]
          application = config_var.applications.find_by(name: heroku_application_name)
          # application have this app but not found in previous block
          if application != nil
            # someone removed this config_var from app or changed it`s value on heroku
            # remove association and destroy record of application
            config_var.applications.destroy(application)
          end
        end
      end
    end
  end

  def get_app_url(app_name)
    base = 'https://dashboard.heroku.com/apps/'
    url = base + app_name
  end
end
