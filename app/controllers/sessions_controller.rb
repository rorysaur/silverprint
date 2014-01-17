class SessionsController < ApplicationController
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.find_by_credentials(params[:user])
    
    if @user
      login!(@user)
      redirect_to feed_user_url(@user)
    else
      flash[:failure] = "Invalid username or password."
      @user = User.new
      render :new
    end
  end
  
  def destroy
    logout!(current_user)
    flash[:success] = "Logged out."
    redirect_to root_url
  end
end
