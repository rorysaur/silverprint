module SessionsHelper
  
  def current_user
    User.find_by_session_token(session[:session_token])
  end
  
  def logged_in?
    !current_user.nil?
  end
  
  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end
  
  def logout!(user)
    user.reset_session_token!
    session[:session_token] = nil
  end
  
  def require_login
    unless logged_in?
      flash[:failure] = "You must be logged in to view this page."
      redirect_to root_url
    end
  end
  
  def authenticate(id)
    user = User.find(id)
    unless logged_in? && current_user == user
      flash[:failure] = "You don't have permission to access this page."
    end
  end
end
