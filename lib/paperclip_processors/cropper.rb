module Paperclip
  class Cropper < Thumbnail
    def initialize(file, options = {}, attachment = nil)
      super
      @current_geometry.width = target.width
      @current_geometry.height = target.height
      p target
    end
    
    def transformation_command
      crop_command = [
                "-crop",
                "#{target.width}x#{target.height}+#{target.x}+#{target.y}",
                "+repage"
      ]
      
      p crop_command
      crop_command + super
    end
    
    def target
      @attachment.instance
    end
  end
end