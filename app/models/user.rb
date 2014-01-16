class User < ActiveRecord::Base
  attr_accessible :username, :password
  attr_reader :password
  
  before_validation :reset_session_token, :on => :create
  
  validates :username, :password_digest, :session_token, :presence => true
  validates :username, :session_token, :uniqueness => true
  validates(
    :password,
    :presence => true,
    :length => { :minimum => 6 },
    :on => :create
  )
  
  def self.find_by_credentials(user_params)
    user = User.find_by_username(user_params[:username])
    return user if user && user.is_password?(user_params[:password])
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64(16)
  end
  
  def reset_session_token!
    reset_session_token
    self.save!
  end
  
end