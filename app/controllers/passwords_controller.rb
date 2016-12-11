require 'nokogiri'
require 'base64'
require 'uri'
require 'rest-client'

class PasswordsController < ApplicationController
  FAVICON_DEFAULT_PATH = '/favicon.ico'

  before_action :get_all_passwords, only: [:create, :update, :destroy]

  def new
    @password = Password.new

    respond_to do |format|
      format.js
    end
  end

  def create
    check_password_url!

    @password = Password.create(password_params)

    if favico = get_favicon
      @password.favicon = favico
      @password.save
    end

    respond_to do |format|
      format.js
    end
  end

  def edit
    @password = Password.find(params[:id])

    respond_to do |format|
      format.js
    end

  end

  def update
    check_password_url!

    @password = Password.find(params[:id])
    @password.update_attributes(password_params)

    if favico = get_favicon
      @password.favicon = favico
      @password.save
    end

    respond_to do |format|
      format.js
    end
  end

  def destroy
    @password = Password.find(params[:id])
    @password.destroy

    respond_to do |format|
      format.js
    end
  end

  private

  def password_params
    @password_params ||= params.require(:password).permit(:title, :URL, :username, :password)
  end

  def get_all_passwords
    @passwords = Password.all
  end

  def get_favicon
    if host = get_host
      if favico = Favicon.where(host: host).first
        favico
      else
        favico = Favicon.new(host: get_host)

        unless ico = get_favicon_from_uri
          ico = get_favicon_from_html_tag
        end

        favico.data = ico
        favico.save
        favico
      end
    end
  end

  def get_favicon_from_uri
    uri = URI::HTTP.build({:host => get_host, :path => FAVICON_DEFAULT_PATH})

    resp = RestClient.get(uri.to_s)
    return Base64.encode64(resp.body) if resp.code == 200
  rescue
    false
  end

  def get_favicon_from_html_tag
    uri = URI::HTTP.build host: get_host, path: '/'
    page_resp = RestClient.get(uri.to_s)

    if page_resp.code == 200
      page = Nokogiri::HTML(page_resp.body)

      page.css('link[rel="shortcut icon"]').each do |link|
        linkURI = URI(link['href'])

        unless linkURI.host
          linkURI = URI.join(uri, linkURI)
        end

        unless linkURI.scheme
          linkURI.scheme = 'http'
        end

        resp = RestClient.get(linkURI.to_s)

        return Base64.encode64(resp.body) if resp.code == 200
      end
    end
  rescue
    false
  end

  def check_password_url!
    uri = URI.parse(password_params[:URL])

    if(!uri.scheme)
      password_params[:URL] = 'http://' + password_params[:URL]
    end
  rescue
  end

  def get_host
    @host ||= URI(password_params[:URL]).host
  rescue
    nil
  end

end
