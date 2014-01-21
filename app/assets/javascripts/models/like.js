Silverprint.Models.Like = Backbone.Model.extend({
  
  initialize: function (options) {
    this.set({ id: options.id });
    this.photoId = options.photoId;
  },
  
  urlRoot: function () {
    return "/api/photos/" + this.photoId + "/likes"
  }
});