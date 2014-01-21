Silverprint.Models.Photo = Backbone.Model.extend({
  
  urlRoot: "/api/photos",
  
  isLikedBy: function (user) {
    var notLiked = this.get("likers").every(function (liker) {
      return liker.id != user.id;
    });
    
    return !notLiked;
  },
  
  toJSON: function () {
    var attrs = _.clone(this.attributes);
    return { photo: attrs };
  }
});