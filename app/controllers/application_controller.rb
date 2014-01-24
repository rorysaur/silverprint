class ApplicationController < ActionController::Base
  protect_from_forgery
  
  include SessionsHelper
  
  # def check_demo_user(photo)
  #   if current_user.is_demo_user?
  #     if current_user.photos.sort_by(&:id).take(6)
  #       render :json => "can't delete original photos"
  #     end
  #   end
  # end
end
