Silverprint.Routers.Router = Backbone.Router.extend({
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = options.collection;
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
    
  },
  
  photoNew: function () {
    
  },
  
  usersIndex: function () {
    var router = this;
    
    var indexView = new Silverprint.Views.UsersIndex({
      collection: router.collection
    });
    
    router._swapView(indexView);
  },
  
  userShow: function (id) {
    var router = this;
    router._getUser(id, function (user) {
      var showView = new Silverprint.Views.UserShow({
        model: user
      });

      router._swapView(showView);
    });
  },
  
  _getUser: function (id, callback) {
    var user = Silverprint.users.get(id);
    
    if (!user) {
      user = new Silverprint.Models.User({ id: id });
      user.collection = Silverprint.users;
      user.fetch({
        success: function () {
          Silverprint.users.add(user);
          callback(user);
        }
      });
    } else {
      user.fetch({
        success: function () {
          callback(user);
        }
      });
    }
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});