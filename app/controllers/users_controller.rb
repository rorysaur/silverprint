class UsersController < ApplicationController
  before_filter :require_login, :except => [:new, :create]
  
  before_filter :only => [:edit, :update, :destroy, :feed] do |controller|
    controller.authenticate(params[:id])
  end
  
  def index
    @users = User.includes(:followers).all
  end
  
  def show
    @user = User.with_show_data(params[:id])
              
    @photos = @user.photos.sort_by(&:created_at).reverse
    
    if current_user.is_following?(@user)
      @follow = current_user.follows_initiated.find_by_followee_id(@user.id)
    else
      @follow = Follow.new
    end    
  end
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(params[:user])
    
    if @user.save
      flash[:success] = "Welcome to silverprint!"
      login!(@user)
      redirect_to user_url(@user)
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  def edit
    @user = User.find(params[:id])
  end
  
  def update
    @user = User.find(params[:id])
    
    if @user.update_attributes(params[:user])
      flash[:success] = "User updated."
      redirect_to user_url(@user)
    else
      flash[:errors] = @user.errors.full_messages
      render :edit
    end
  end
  
  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to root_url
  end
  
  def favorites
    @user = User.includes(:likes, :liked_photos => [:user, :likes])
                .find(params[:id])
    @photos = @user.liked_photos.sort_by(&:created_at).reverse
  end
  
  def feed
    @user = User.with_feed_data(params[:id])
    @photos = @user.feed_photos
  end
  
end
