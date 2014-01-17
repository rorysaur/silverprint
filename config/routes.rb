Silverprint::Application.routes.draw do
  root :to => "static_pages#root"
  
  resources :users do
    resources :photos, :only => :index
    resources :follows, :only => :create
    member do
      get 'feed'
      get 'favorites'
    end
  end
  
  resource :session, :only => [:new, :create, :destroy]
  
  resources :photos, :only => [:new, :create, :destroy] do
    resources :likes, :only => :create
  end
  
  resources :follows, :only => :destroy
  resources :likes, :only => :destroy
end