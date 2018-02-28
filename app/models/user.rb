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

  def pull_config_vars
    @heroku = PlatformAPI.connect_oauth(token)
    heroku_apps = @heroku.app.list

    all_config_vars = config_vars.all.includes(:applications)
    all_applications = applications.all

    # remove applications that user does not participate anymore
    all_applications.each do |application|
      next unless heroku_apps.find { |heroku_app|
        heroku_app['name'] == application.name }.nil?
      all_applications.delete(application.id)
    end

    heroku_apps.each do |heroku_application|
      heroku_application_name = heroku_application['name']

      # add applications to the user if not exists
      if all_applications.find { |application|
        application.name == heroku_application_name }.nil?
        all_applications.create(name: heroku_application_name)
      end

      heroku_config_vars = @heroku.config_var.info_for_app(heroku_application_name)
      heroku_config_vars.each do |heroku_config_var|
        config_var = all_config_vars.find { |cv| cv.name == heroku_config_var[0] && cv.value == heroku_config_var[1] }
        if config_var.nil?
          # add new config_vars if doesn`t exists and make association with app
          config_var = all_config_vars.create(name: heroku_config_var[0], value: heroku_config_var[1])
          config_var.applications.create(name: heroku_application_name, url: get_app_url(heroku_application_name))
          all_config_vars.reload
        else
          unless config_var.applications.find_by(name: heroku_application_name)
            # existing config_var found in new app. Make association with app
            config_var.applications.create(name: heroku_application_name, url: get_app_url(heroku_application_name))
          end
        end
      end

      # some of the config_vars does not belongs to this heroku_application anymore
      all_config_vars.each do |config_var|
        next unless config_var.applications.find { |app|
          app.name == heroku_application_name } &&
                    heroku_config_vars.find { |name, value|
                      name == config_var.name &&
                      value == config_var.value }.nil?
        id_app = config_var.applications.where(name: heroku_application_name).to_a[0].id
        Application.delete(id_app)
      end
    end
  end

  def commit_config_vars(config_vars)
    heroku = PlatformAPI.connect_oauth(token)
    config_vars.each do |config_var|
      commit_config_var(heroku, config_var)
    end
  end

  def commit_config_var(heroku, config_var)
    if config_var.is_created == 'true'
      add_config_var(heroku, config_var)
    elsif config_var.is_updated == 'true'
      update_config_var_to_heroku(heroku, config_var)
    elsif config_var.is_deleted == 'true'
      remove_config_var_from_heroku(heroku, config_var)
      config_vars.destroy(config_var.id)
    end
  end

  def add_config_var(heroku, config_var)
    # just save to db if created cv not related to any app
    if config_var.applications_names.size.zero?
      config_vars.create(name: config_var.name, value: config_var.value)
      return
    end
    add_config_var_to_heroku(heroku, config_var)
  end

  def add_config_var_to_heroku(heroku, config_var)
    if config_var.applications_names.size.positive?
      config_var.applications_names.each do |application_name|
        add_config_var_to_heroku_app(heroku, config_var, application_name)
      end
    else
      config_var.applications.each do |application|
        add_config_var_to_heroku_app(heroku, config_var, application.name)
      end
    end
  end

  def add_config_var_to_heroku_app(heroku, config_var, application_name)
    heroku.config_var.update(application_name.to_s,
                             config_var.name.to_s => config_var.value.to_s)
  end

  def update_config_var_to_heroku(heroku, config_var)
    local_config_var = config_vars.find(config_var.id)
    unless  local_config_var.name == config_var.name &&
        local_config_var.value == config_var.value
      remove_config_var(heroku, local_config_var)
      add_config_var(heroku, config_var)
      return
    end

    # name and values are unchanged
    # check applications
    local_applications = local_config_var.applications.all

    # add new applications
    config_var.applications_names.each do |application_name|
      next unless local_applications.find { |app| app.name == application_name.to_s }.nil?
      add_config_var_to_heroku_app(heroku, local_config_var, application_name)
    end

    # remove disconnected applications
    local_applications.each do |local_application|
      next unless config_var.applications_names.find { |app_name| app_name.to_s == local_application.name }.nil?
      remove_config_var_from_heroku_app(heroku, config_var, local_application.name)
    end
  end

  def remove_config_var(heroku, config_var)
    config_vars.delete(config_var.id)
    remove_config_var_from_heroku(heroku, config_var)
  end

  def remove_config_var_from_heroku(heroku, config_var)
    if config_var.applications_names.size.positive?
      config_var.applications_names.each do |application_name|
        remove_config_var_from_heroku_app(heroku, config_var, application_name)
      end
    else
      config_var.applications.each do |application|
        remove_config_var_from_heroku_app(heroku, config_var, application.name)
      end
    end
  end

  def remove_config_var_from_heroku_app(heroku, config_var, application_name)
    heroku.config_var.update(application_name.to_s,
                             config_var.name.to_s => nil)
  end

  def get_app_url(app_name)
    base = 'https://dashboard.heroku.com/apps/'
    url = base + app_name
  end
end
