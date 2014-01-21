Silverprint.Collections.FeedPhotos = Backbone.Collection.extend({
  
  model: Silverprint.Models.Photo,
  
  url: function () {
    return "/api/users/" + Silverprint.currentUser.id + "/feed";
  },
  
  comparator: function (photo) {
    return photo.get("createdAt") * -1;
  },
  
  parse: function (data) {
    return data.feedPhotos;
  }
});