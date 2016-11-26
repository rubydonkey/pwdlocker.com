require 'httparty'
require 'nokogiri'
require 'base64'
require 'uri'

class Favicon

  attr_reader :host,
              :uri,
              :base64

  def initialize(uri)
    @host = URI(uri).host
    get_favicon_from_uri
    get_favicon_from_html_tag
  end

  protected

  def get_favicon_from_uri
    uri = URI::HTTP.build({:host => @host, :path => '/favicon.ico'})
    response = HTTParty.get(uri)
    if(response.code == 200)
      @uri = uri
      @base64 = Base64.encode64(response.body)
    end
  end

  def get_favicon_from_html_tag
    uri = URI::HTTP.build({:host => @host, :path => '/'})
    response = HTTParty.get(uri)
    if(response.code == 200)
      page = Nokogiri::HTML(response)
      page.css('link[rel="shortcut icon"]').each do |link|
        linkURI = URI(link['href'])

        if(!linkURI.host)
          linkURI = URI.join(uri, linkURI)
        end

        response = HTTParty.get(linkURI)
        if(response.code == 200)
          @uri = linkURI
          @base64 = Base64.encode64(response.body)
        end
      end
    end
  end
end