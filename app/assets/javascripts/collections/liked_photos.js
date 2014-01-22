Silverprint.Collections.LikedPhotos = Backbone.Collection.extend({
  
  model: Silverprint.Models.Photo,
  
  url: function () {
    return "/api/users/" + Silverprint.currentUser.id + "/favorites"
  },
  
  comparator: function (photo) {
    return photo.get("id") * -1;
  },
  
  parse: function (data) {
    return data.photos;
  }
});