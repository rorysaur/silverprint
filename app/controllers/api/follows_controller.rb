class Api::FollowsController < ApplicationController
  before_filter :require_login
  
  def create
    @follow = Follow.new
    @follow.follower = current_user
    @follow.followee_id = params[:user_id]
    
    if current_user.id == @follow.followee_id
      render :json => "cannot follow self", :status => 422
    end
    
    if @follow.save
      render :json => @follow
    else
      render :json => @follow.errors
    end
  end
  
  def destroy
    @follow = Follow.find(params[:id])
    @follow.destroy
    render :json => @follow
  end
end
