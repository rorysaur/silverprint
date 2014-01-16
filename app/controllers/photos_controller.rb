class PhotosController < ApplicationController
  before_filter :require_login
  before_filter :only => [:destroy] do |controller|
    @photo = Photo.find(params[:id])
    controller.authenticate(@photo.user.id)
  end
  
  def index
    @photos = current_user.photos
  end
  
  # no show
  
  def new
    @photo = Photo.new
  end
  
  def create
    @photo = Photo.new(params[:photo])
    @photo.user = current_user
    
    if @photo.save
      flash[:success] = "Photo saved."
      redirect_to user_url(@photo.user)
    else
      flash[:errors] = @photos.errors.full_messages
      render :new
    end
  end
  
  # no edit or update
  
  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    flash[:success] = "Photo deleted."
    redirect_to user_url(@photo.user)
  end
end
