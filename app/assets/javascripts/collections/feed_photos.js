Silverprint.Collections.FeedPhotos = Backbone.Collection.extend({
  
  model: Silverprint.Models.Photo,
  
  url: function () {
    return "/api/users/" + Silverprint.currentUser.id + "/feed";
  },
  
  comparator: function (photo) {
    return photo.get("id") * -1;
  },
  
  parse: function (data) {
    return data.feedPhotos;
  }
});