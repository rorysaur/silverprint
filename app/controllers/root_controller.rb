class RootController < ApplicationController
  
  def root
    if logged_in?
      render :root
    else
      @user = User.new
      render "static_pages/root"
    end
  end
end
