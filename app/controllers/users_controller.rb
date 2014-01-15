class UsersController < ApplicationController
  before_filter :require_login, :except => [:new, :create]
  
  before_filter :only => [:edit, :update, :destroy] do |controller|
    controller.authenticate(params[:id])
  end
  
  def index
    @users = User.all
  end
  
  def show
    @user = User.find(params[:id])
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
end
