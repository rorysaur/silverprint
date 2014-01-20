Silverprint.Models.Photo = Backbone.Model.extend({
  
  isLikedBy: function (user) {
    var notLiked = this.get("likers").every(function (liker) {
      return liker.id != user.id;
    });
    
    return !notLiked;
  }
});