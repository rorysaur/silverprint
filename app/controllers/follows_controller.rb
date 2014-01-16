class FollowsController < ApplicationController
  before_filter :require_login
  
  def create
    @follow = Follow.new
    @follow.follower = current_user
    @follow.followee_id = params[:user_id]
    
    if current_user.id == @follow.followee_id
      flash[:failure] = "You can't follow yourself. Sorry."
      redirect_to user_url(current_user)
    end
    
    if @follow.save
      flash[:success] = "Following #{@follow.followee.username}."
      redirect_to user_url(@follow.followee)
    else
      flash[:errors] = @follow.errors.full_messages
      redirect_to user_url(@follow.followee)
    end
  end
  
  def destroy
    @follow = Follow.find(params[:id])
    @follow.destroy
    flash[:success] = "Stopped following #{@follow.followee.username}."
    redirect_to user_url(@follow.followee)
  end
end
