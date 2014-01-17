class LikesController < ApplicationController
  
  def create
    @like = Like.new
    @like.photo_id = params[:photo_id]
    @like.user = current_user
    
    if @like.save
      flash[:success] = "Liked."
      redirect_to feed_user_url(current_user)
    else
      flash[:errors] = @like.errors.full_messages
      redirect_to feed_user_url(current_user)
    end
  end
  
  def destroy
    @like = Like.find(params[:id])
    @like.destroy
    flash[:success] = "Unliked."
    redirect_to feed_user_url(current_user)
  end
end
