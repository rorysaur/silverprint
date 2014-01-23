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
        });
        Backbone.history.start();
      },
      
      error: function (model, xhr) {
        console.log(xhr);
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


