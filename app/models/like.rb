class Like < ActiveRecord::Base
  attr_accessible :photo_id
  
  validates :photo, :user, :presence => true
  validates :photo_id, :uniqueness => { :scope => :user_id }
  
  belongs_to :user
  belongs_to :photo
end
