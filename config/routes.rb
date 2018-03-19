Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  devise_scope :user do
    get 'sign_in', to: 'devise/sessions#new', as: :new_user_session
    delete 'sign_out', to: 'devise/sessions#destroy', as: :destroy_user_session
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: redirect('/app')

  get '/app', to: 'pages#index', as: :app

  resources :users

  get 'user_data' => 'users#user_data'
  post 'commit_config_vars' => 'users#commit_config_vars'

end
