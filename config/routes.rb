Rails.application.routes.draw do
  get 'passwords/new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "pages#index"

  resources :passwords
  resources :password_groups
  # root to: "signin#new"

  get '/signin', to: 'signin#new', as: :signin

  get  'signin/show'
  post 'signin/show'
  get  'signin/secret_token'
  post 'signin/secret_token'
end
