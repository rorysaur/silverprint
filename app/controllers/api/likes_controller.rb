class Api::LikesController < ApplicationController
  def create
    @like = Like.new
    @like.photo_id = params[:photo_id]
    @like.user = current_user
    
    if @like.save
      render :json => @like
    else
      render :json => @like.errors
    end
  end
  
  def destroy
    @like = Like.find(params[:id])
    @like.destroy
    render :json => @like
  end
end
