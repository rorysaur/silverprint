window.Silverprint = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function (currentUserId) {
    Silverprint.currentUser = new Silverprint.Models.User({
      id: currentUserId
    });
    
    Silverprint.currentUser.fetch({
      success: function () {
        Silverprint.router = new Silverprint.Routers.Router({
          $rootEl: $('#content'),
          collection: Silverprint.users
        });
        Backbone.history.start();
        Silverprint.dispatcher = _.extend({}, Backbone.Events);
      },
      
      error: function (xhr) {
        console.log(xhr)
      }
    });
    
    this.installFullscreenHandler();
    
  },
  
  installFullscreenHandler: function () {
    $("#fullscreen").click(function () {
      if (screenfull.enabled) {
        screenfull.request();
      }
    });
  }
};


