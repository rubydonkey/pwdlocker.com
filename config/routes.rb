Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "pages#index"

  resources :passwords
  resources :signins

  get     'login'     =>  'sessions#new'
  post    'login'     =>  'sessions#create'
  delete  'logout'    =>  'sessions#destroy'

  # root to: "signin#new"

  #get '/signin', to: 'signin#new', as: :signin

  #get  'signin/show'
  #post 'signin/show'
  #get  'signin/secret_token'
  #post 'signin/secret_token'
end
