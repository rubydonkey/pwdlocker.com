require 'nokogiri'
require 'base64'
require 'uri'
require 'rest-client'

class Favicon

  attr_reader :host,
              :uri,
              :base64

  def initialize(uri)
    @host = URI(uri).host
    if(!get_favicon_from_html_tag)
      get_favicon_from_uri
    end
  end

  protected

  def get_favicon_from_uri
    uri = URI::HTTP.build({:host => @host, :path => '/favicon.ico'})
    begin
      response = RestClient.get(uri.to_s)
      if(response.code == 200)
        @uri = uri
        @base64 = Base64.encode64(response.body)
      end
    rescue
      return false
    end
  end

  def get_favicon_from_html_tag
    uri = URI::HTTP.build({:host => @host, :path => '/'})
    begin
      response = RestClient.get(uri.to_s)
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
    rescue
      return false
    end
  end

end
