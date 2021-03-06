Silverprint::Application.routes.draw do
  root :to => "root#root"
  get "/about", :to => "static_pages#about"
  resource :session, :only => [:new, :create, :destroy]

  # api routes
  namespace :api, :defaults => { :format => :json } do
    resources :users, :except => [:new, :edit] do
      resources :photos, :only => :index
      resources :follows, :only => [:index, :create]
      member do
        get 'feed'
        get 'favorites'
      end
    end
  
    resources :photos, :only => [:show, :create, :update, :destroy] do
      resources :likes, :only => :create
      collection do
        get 'random'
      end
    end
  
    resources :follows, :only => :destroy
    resources :likes, :only => :destroy
  end
  
  # multi-page app routes
  resources :users, :only => [:new, :create]
#  resources :users do
#     resources :photos, :only => :index
#     resources :follows, :only => :create
#     member do
#       get 'feed'
#       get 'favorites'
#     end
#   end
# 
#   resources :photos, :only => [:new, :create, :destroy] do
#     resources :likes, :only => :create
#   end
# 
#   resources :follows, :only => :destroy
#   resources :likes, :only => :destroy
end