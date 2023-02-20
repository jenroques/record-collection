Rails.application.routes.draw do

  resources :users, only: [:index, :show, :create]
  resources :artist, only: [:index, :show, :create, :update, :destroy]
  resources :records, only: [:index, :show, :create, :update, :destroy]
  resources :collections, only: [:index, :show, :create, :update, :destroy]
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
