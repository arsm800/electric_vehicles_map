Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  root to: "states#index"

  get "/states_json", to: "states#states_json"
  get "/stations_json", to: "stations#stations_json"

  resources :states do
  resources :stations
end

# Prefix Verb   URI Pattern                                   Controller#Action
#   root GET    /                                             states#index
# state_stations GET    /states/:state_id/stations(.:format)          stations#index
#        POST   /states/:state_id/stations(.:format)          stations#create
# new_state_station GET    /states/:state_id/stations/new(.:format)      stations#new
# edit_state_station GET    /states/:state_id/stations/:id/edit(.:format) stations#edit
# state_station GET    /states/:state_id/stations/:id(.:format)      stations#show
#        PATCH  /states/:state_id/stations/:id(.:format)      stations#update
#        PUT    /states/:state_id/stations/:id(.:format)      stations#update
#        DELETE /states/:state_id/stations/:id(.:format)      stations#destroy
# states GET    /states(.:format)                             states#index
#        POST   /states(.:format)                             states#create
# new_state GET    /states/new(.:format)                         states#new
# edit_state GET    /states/:id/edit(.:format)                    states#edit
#  state GET    /states/:id(.:format)                         states#show
#        PATCH  /states/:id(.:format)                         states#update
#        PUT    /states/:id(.:format)                         states#update
#        DELETE /states/:id(.:format)                         states#destroy



  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
