Silverprint.Models.User = Backbone.Model.extend({
  
  isFollowedBy: function (otherUser) {
    var notFollowed = this.get("followers").every(function (follower) {
      return follower.id != otherUser.id;
    });
    
    return !notFollowed;
  },
  
  parse: function (data) {
    var photos = data.photos;
    data.photos = new Silverprint.Collections.UserPhotos(photos, {
      userId: data.id
    });
    return data;
  },
  
  toJSON: function () {
    var data = _.clone(this.attributes);
    data.photos = this.get('photos').toJSON();
    return data;
  },
  
  validate: function (attrs) {  }
});