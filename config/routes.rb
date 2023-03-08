Rails.application.routes.draw do

  resources :users, only: [:index, :show, :create, :destroy]
  resources :artists, only: [:index, :show, :create, :update, :destroy]
  resources :records, only: [:index, :show, :create, :update, :destroy]
  resources :collections, only: [:index, :show, :create, :update, :destroy]

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  patch "/addtocollection", to: "records#add_to_collection"
  post "/addtorecord", to: "records#add_to_record"
  delete "/deletefromrecord", to: "records#delete_from_record"

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
