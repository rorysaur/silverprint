class Photo < ActiveRecord::Base
  attr_accessible :photo
  
  validates :user, :photo, :presence => true
  
  has_attached_file(
    :photo,
    :styles => {
      :normal => "400x400#",
      :thumbnail => "50x50#"
    },
    :convert_options => {
      :all => "-colorspace Gray"
    }
  )
  
  belongs_to :user
  
  has_many :likes
  
  has_many(
    :likers,
    :through => :likes,
    :source => :user
  )
  
  def liked_by?(user)
    self.likers.include?(user)
  end
  
end
