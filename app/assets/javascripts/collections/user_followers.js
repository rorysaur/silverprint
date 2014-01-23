Silverprint.Collections.UserFollowers = Backbone.Collection.extend({
  
  model: Silverprint.Models.User,
  
  url: "/api/users",
  
  comparator: function (user) {
    return user.get('created_at') * -1;
  }
  
});