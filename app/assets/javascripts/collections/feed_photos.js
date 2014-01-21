Silverprint.Collections.FeedPhotos = Backbone.Collection.extend({
  
  model: Silverprint.Models.Photo,
  
  url: function () {
    return "/api/users/" + Silverprint.currentUser.id + "/feed";
  },
  
  parse: function (data) {
    return data.feedPhotos;
  }
});