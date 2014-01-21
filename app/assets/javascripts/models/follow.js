Silverprint.Models.Follow = Backbone.Model.extend({
  
  initialize: function (options) {
    this.set({ id: options.id });
    this.followedUserId = options.followedId;
  },
  
  // for follows#create
  urlRoot: function () {
    return "/api/users/" + this.followedUserId + "/follows";
  }
});