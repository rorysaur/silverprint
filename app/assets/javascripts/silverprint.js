window.Silverprint = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Silverprint.users = new Silverprint.Collections.AllUsers();
    Silverprint.users.fetch({
      success: function (users) {
        console.log(users);
      },
      
      error: function (xhr) {
        console.log(xhr)
      }
    });
    
    new Silverprint.Routers.Router({
      $rootEl: $('#content'),
      collection: Silverprint.users
    });
    Backbone.history.start();
  }
};


