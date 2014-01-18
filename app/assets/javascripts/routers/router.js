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
    
  },
  
  _getUser: function (id) {
    
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});