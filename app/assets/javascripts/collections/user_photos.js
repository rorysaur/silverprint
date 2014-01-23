Silverprint.Collections.UserPhotos = Backbone.Collection.extend({
  
  initialize: function (models, options) {
    this.userId = options.userId;
  },
  
  model: Silverprint.Models.Photo,
  
  url: function () {
   return "/api/users/" + this.userId + "/photos"; 
  },
  
  comparator: function (photo) {
    return photo.get('orderId') * -1;
  }
});