class Photo < ActiveRecord::Base
  attr_accessible :photo
  
  validates :user, :photo, :presence => true
  
  belongs_to :user
  
  has_attached_file(
    :photo,
    :styles => {
      :normal => "500x500>",
      :thumbnail => "50x50#"
    },
    :convert_options => {
      :all => "-colorspace Gray"
    }
  )
end
