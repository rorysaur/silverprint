class Photo < ActiveRecord::Base
  attr_accessible :photo, :order_id, :x, :y, :width, :height
  attr_accessor :x, :y, :width, :height
  
  validates :user, :photo, :presence => true
  
  has_attached_file(
    :photo,
    :styles => {
      :large => "500x500#",
      :vertical => "400x400#",
      :grid => "300x300#",
      :thumbnail => "50x50#"
    },
    :processors => lambda { |instance| instance.processors },
  )
  
  validates_attachment(:photo, :presence => true,
                       :size => { :in => 0..4096.kilobytes })
  
  belongs_to :user
  
  has_many :likes
  
  has_many(
    :likers,
    :through => :likes,
    :source => :user
  )
  
  def self.random
    offset = rand(Photo.count)
    Photo.first(:offset => offset)
  end
  
  def x=(x)
    @x = x.to_i
  end
  
  def y=(y)
    @y = y.to_i
  end
  
  def width=(width)
    @width = width.to_i
  end
  
  def height=(height)
    @height = height.to_i
  end
  
  def processors
    if @from_url
      [:thumbnail]
    else
      [:cropper]
    end
  end
  
  def liked_by?(user)
    self.likers.include?(user)
  end
  
  def photo_from_url(url)
    @from_url = true
    self.photo = URI.parse(url)
  end
  
end
