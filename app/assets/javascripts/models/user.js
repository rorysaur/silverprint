Silverprint.Models.User = Backbone.Model.extend({
  
  isDemoUser: function () {
    return this.get("username") == "demonic";
  },
    
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
    var attrs = _.clone(this.attributes);
    attrs.photos = this.get('photos').toJSON();
    return { user: attrs };
  },
  
  validate: function (attrs) {  },
  
  urlRoot: "/api/users"
});