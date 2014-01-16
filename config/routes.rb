Silverprint::Application.routes.draw do
  root :to => "static_pages#root"
  
  resources :users do
    resources :photos, :only => :index
    resources :follows, :only => :create
  end
  
  resource :session, :only => [:new, :create, :destroy]
  resources :photos, :only => [:new, :create, :destroy]
  resources :follows, :only => [:destroy]
end