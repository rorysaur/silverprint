window.Silverprint = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function (currentUserId) {
    Silverprint.users = new Silverprint.Collections.AllUsers();
    Silverprint.users.fetch({
      success: function (users) {
        console.log(users);
        Silverprint.currentUser = Silverprint.users.get(currentUserId);
        Silverprint.router = new Silverprint.Routers.Router({
          $rootEl: $('#content'),
          collection: Silverprint.users
        });
        Backbone.history.start();
    
        Silverprint.router._getUser(2, function (user) { console.log(user) });
      },
      
      error: function (xhr) {
        console.log(xhr)
      }
    });    
    
    
  }
};


