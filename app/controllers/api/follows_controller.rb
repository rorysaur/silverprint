class Api::FollowsController < ApplicationController
  before_filter :require_login
  
  def index
    @user = User.find(params[:user_id])
    
    if current_user.is_following?(@user)
      @follow = current_user.follows_initiated.find_by_followee_id(@user.id)
    else
      @follow = Follow.new
    end
    
    if @follow
      render :json => @follow
    else
      render :json => @follow.errors, :status => 422
    end
  end
  
  def create
    @follow = Follow.new
    @follow.follower = current_user
    @follow.followee_id = params[:user_id]
    
    if current_user.id == @follow.followee_id
      render :json => "cannot follow self", :status => 422 and return
    end
    
    if @follow.save
      render :json => @follow
    else
      render :json => @follow.errors, :status => 422
    end
  end
  
  def destroy
    @follow = Follow.find(params[:id])
    @follow.destroy
    render :json => @follow
  end
end
