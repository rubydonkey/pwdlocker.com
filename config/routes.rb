Rails.application.routes.draw do
  get 'passwords/new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "pages#index"

  resources :passwords

end
