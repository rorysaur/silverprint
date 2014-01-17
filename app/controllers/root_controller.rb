class RootController < ApplicationController
  
  def root
    if logged_in?
      render :root
    else
      render "static_pages/root"
    end
  end
end
