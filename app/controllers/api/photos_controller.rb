class Api::PhotosController < ApplicationController
  before_filter :require_login
  before_filter :only => [:destroy] do |controller|
    @photo = Photo.find(params[:id])
    controller.authenticate(@photo.user.id)
  end
  
  def index
    @photos = User.includes(:photos).find(params[:user_id]).photos
    render "api/photos/index"
  end
  
  def show
    @photo = Photo.find(params[:id])
    render "api/photos/show"
  end
  
  def create
    @photo = Photo.new(params[:photo])
    @photo.user = current_user
    
    if @photo.save
      render :json => @photo
    else
      render :json => @photos.errors, :status => 422
    end
  end
    
  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    render :json => @photo
    end
end
