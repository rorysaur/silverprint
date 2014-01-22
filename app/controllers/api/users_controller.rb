class Api::UsersController < ApplicationController
  before_filter :require_login, :except => [:new, :create]
  
  before_filter :only => [:update, :destroy, :favorites, :feed] do |controller|
    controller.authenticate(params[:id])
  end
  
  def index
    @users = User.includes(:followers, :follows_received).all
    
    @users.each do |user|
      user.follows_received.select! { |follow| follow.follower == current_user }
    end
    
    render "api/users/index"
  end
  
  def show
    @user = User.with_show_data(params[:id])
              
    @photos = @user.photos.sort_by(&:created_at).reverse
    
    if current_user.is_following?(@user)
      @follow = current_user.follows_initiated.find_by_followee_id(@user.id)
    else
      @follow = Follow.new
    end
    
    render "api/users/show"
  end
  
  def create
    @user = User.new(params[:user])
    
    if @user.save
      login!(@user)
      render :json => @user
    else
      render :json => @user.errors, :status => 422
    end
  end
  
  def update
    @user = User.find(params[:id])
    
    if @user.update_attributes(params[:user])
      @user = User.with_show_data(params[:id])
      @photos = @user.photos.sort_by(&:created_at).reverse
    
      if current_user.is_following?(@user)
        @follow = current_user.follows_initiated.find_by_followee_id(@user.id)
      else
        @follow = Follow.new
      end
      
      render "api/users/show"
    else
      render :json => @user.errors, :status => 422
    end
  end
  
  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render :json => @user
  end
  
  def favorites
    @user = User.includes(:likes, :liked_photos => [:user, :likes, :likers])
                .find(params[:id])
    @photos = @user.liked_photos.sort_by(&:created_at).reverse
    render "api/users/favorites"
  end
  
  def feed
    @user = User.with_feed_data(params[:id])
    @photos = @user.feed_photos
    
    render "api/users/feed"
  end
  
end
