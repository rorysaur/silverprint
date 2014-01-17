class User < ActiveRecord::Base
  attr_accessible :username, :password, :profile_pic
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
  
  has_attached_file(
    :profile_pic,
    :styles => {
      :big => "500x500>",
      :thumbnail => "50x50#"
    },
    :convert_options => {
      :all => "-colorspace Gray"
    }
  )

  has_many :photos
  
  has_many(
    :follows_initiated,
    :class_name => "Follow",
    :foreign_key => :follower_id
  )
  
  has_many(
    :follows_received,
    :class_name => "Follow",
    :foreign_key => :followee_id
  )
  
  has_many(
    :followers,
    :through => :follows_received,
    :source => :follower
  )
  
  has_many(
    :following,
    :through => :follows_initiated,
    :source => :followee
  )
  
  has_many :likes
  
  has_many(
    :liked_photos,
    :through => :likes,
    :source => :photo
  )
  
  def self.find_by_credentials(user_params)
    user = User.find_by_username(user_params[:username])
    return user if user && user.is_password?(user_params[:password])
  end
  
  def is_following?(other_user)
    self.following.include?(other_user)
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def likes?(photo)
    self.liked_photos.include?(photo)
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
