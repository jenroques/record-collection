Rails.application.routes.draw do

  resources :users, only: [:index, :show, :create]
  resources :artists, only: [:index, :show, :create, :update, :destroy]
  resources :records, only: [:index, :show, :create, :update, :destroy]
  resources :collections, only: [:index, :show, :create, :update, :destroy]
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"

  post "/addtocollection", to: "collections#add_to_collection"
  delete "/deletefromcollection", to: "collections#delete_from_collection"

  post "/addtorecord", to: "records#add_to_record"
  delete "/deletefromrecord", to: "records#delete_from_record"

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
