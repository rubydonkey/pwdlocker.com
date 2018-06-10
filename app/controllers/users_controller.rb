class UsersController < ApplicationController

  def index
    @user = current_user if current_user
    render :json => @user.as_json(include: [:applications, config_vars: { include: :applications, methods: [:is_created, :is_updated, :is_deleted]}])
  end

  def user_data
    if current_user
      @user = current_user
      @user.pull_config_vars(session)
    end
    render :json => @user.as_json(include: [:applications, config_vars: { include: :applications, methods: [:is_created, :is_updated, :is_deleted]}])
  end

  def push_config_vars
    return unless current_user
    config_vars = parse_config_vars(params[:configVars])
    current_user.push_config_vars(config_vars)
    render json: {}, status: :no_content
  end

  def work_progress
    return unless current_user
    render :json => current_user.work_progress
  end

  def reset_work_progress
    if(current_user)
      current_user.update_attribute(:work_progress, 0.0)
    end
  end

  def parse_config_vars(data)
    config_vars = []
    config_vars_raw = JSON.parse(data.to_json)
    config_vars_raw.each_value do |value|

      config_var = ConfigVar.new
      config_var.id = value['data']['id']
      config_var.name = value['data']['name']
      config_var.value = value['data']['value']
      config_var.is_created = value['data']['is_created']
      config_var.is_updated = value['data']['is_updated']
      config_var.is_deleted = value['data']['is_deleted']

      applications = value['data']['applications']

      unless applications.nil?
        applications.each_value { |app| config_var.applications_names.push(app['name']) }
      end

      config_vars.push(config_var)
    end
    config_vars
  end
end
