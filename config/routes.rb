Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: redirect('/app')

  get '/app', to: "pages#index", as: :app

  resources :passwords
  resources :password_groups

  resources :signins do
    collection do
      post 'resend_token'
    end
  end

  get     'login'     =>  'sessions#new'
  post    'login'     =>  'sessions#create'
  delete  'logout'    =>  'sessions#destroy'
end
