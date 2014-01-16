class FollowsController < ApplicationController
  before_filter :require_login
  
  def create
    @follow = Follow.new
    @follow.follower = current_user
    @follow.followee_id = params[:user_id]
  end
  
  def destroy
    
  end
end
