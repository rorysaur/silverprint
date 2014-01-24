class Api::PhotosController < ApplicationController
  
  before_filter :require_login, :except => [:random]
  before_filter :only => [:update, :destroy] do |controller|
    @photo = Photo.find(params[:id])
    controller.authenticate(@photo.user.id)
  end
  # before_filter :only => [:destroy] do |controller|
  #   @photo = Photo.find(params[:id])
  #   controller.check_demo_user(@photo)
  # end
  
  def index
    @photos = User.includes(:photos).find(params[:user_id]).photos
    render "api/photos/index"
  end
  
  def show
    @photo = Photo.find(params[:id])
    render "api/photos/show"
  end
  
  def create
    @photo = Photo.new()
    @photo.user = current_user
    @photo.x, @photo.y = params[:photo][:x], params[:photo][:y]
    @photo.width, @photo.height = params[:photo][:width], params[:photo][:height]
    @photo.photo = params[:photo][:photo]
    
    @photo.order_id = Time.now.to_i
    
    if @photo.save
      render :json => @photo
    else
      render :json => @photo.errors, :status => 422
    end
  end
  
  def update
    @photo = Photo.find(params[:id])
    p params[:photo][:orderId]
    
    if @photo.update_attribute(:order_id, params[:photo][:orderId])
      render :json => @photo
    else
      render :json => @photo.errors, :status => 422
    end
  end
    
  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    render :json => @photo
  end
  
  def random
    @photos = Photo.all
    render "api/photos/random"
  end
end
