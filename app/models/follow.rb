class Follow < ActiveRecord::Base
  
  validates :follower, :followee, :presence => true
  validates :follower_id, :uniqueness => { :scope => :followee_id }
  
  belongs_to(
    :follower,
    :class_name => "User",
  )
  
  belongs_to(
    :followee,
    :class_name => "User"
  )
end
