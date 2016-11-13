Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root to: "signin#new"
  
  get  'signin/show'
  post 'signin/show'
  get  'signin/secret_token'

end
