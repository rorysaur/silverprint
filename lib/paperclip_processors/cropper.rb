module Paperclip
  class Cropper < Thumbnail
    def initialize(file, options = {}, attachment = nil)
      super
      if target.width && target.height
        @current_geometry.width = target.width
        @current_geometry.height = target.height
      end
      p target
    end
    
    def transformation_command
      crop_command = [
                "-crop",
                "#{target.width}x#{target.height}+#{target.x}+#{target.y}",
                "+repage"
      ]
      
      p crop_command
      if target.width && target.height && target.x && target.y
        crop_command + super
      else
        []
      end
    end
    
    def target
      @attachment.instance
    end
  end
end