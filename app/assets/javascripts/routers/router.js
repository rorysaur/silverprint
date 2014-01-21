Silverprint.Routers.Router = Backbone.Router.extend({
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
    "": "feed",
    "users": "usersIndex",
    "users/:id": "userShow",
    "favorites": "favorites",
    "new": "photoNew",
  },
  
  favorites: function () {
    
  },
  
  feed: function () {
    var router = this;
    var feedPhotos = new Silverprint.Collections.FeedPhotos();
    
    feedPhotos.fetch({
      success: function (photos) {
        var feedView = new Silverprint.Views.PhotosFeed({
          collection: photos
        });
        
        router._swapView(feedView);
      }
    });
  },
  
  photoNew: function () {
    
  },
  
  usersIndex: function () {
    var router = this;
    var allUsers = new Silverprint.Collections.AllUsers();
    
    allUsers.fetch({
      success: function (users) {
        var indexView = new Silverprint.Views.UsersIndex({
          collection: users
        });
    
        router._swapView(indexView);
      }
    });    
  },
  
  userShow: function (id) {
    var router = this;
    var user = new Silverprint.Models.User({ id: id });
    
    user.fetch({
      success: function (user) {
        var showView = new Silverprint.Views.UserShow({
          model: user
        });

        router._swapView(showView);
      }
    });
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});