Silverprint.Models.Follow = Backbone.Model.extend({
  
  initialize: function (followedId) {
    this.followedUserId = followedId;
  },
  
  // for follows#create
  urlRoot: function () {
    return "/api/users/" + this.followedUserId + "/follows";
  }
});