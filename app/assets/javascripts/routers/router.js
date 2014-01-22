Silverprint.Routers.Router = Backbone.Router.extend({
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    // this.listenTo(Silverprint.dispatcher, "fullscreen", this.fullscreen);
  },
  
  routes: {
    "": "feed",
    "users": "usersIndex",
    "users/:id": "userShow",
    "favorites": "favorites",
    "new": "photoNew",
  },
  
  favorites: function () {
    var router = this;
    var favoritePhotos = new Silverprint.Collections.LikedPhotos();
    
    favoritePhotos.fetch({
      success: function (photos) {
        var favoritesView = new Silverprint.Views.UserFavorites({
          collection: photos
        });
        
        router._swapView(favoritesView);
        
        $(".nav .glyphicon").removeClass("glyphicon-red");
        $(".nav .glyphicon-heart").addClass("glyphicon-red");
      }
    })
    
  },
  
  feed: function () {
    var router = this;
    var feedPhotos = new Silverprint.Collections.FeedPhotos();
    
    feedPhotos.fetch({
      success: function (photos) {
        var feedView = new Silverprint.Views.UserFeed({
          collection: photos
        });
        
        router._swapView(feedView);
        
        $(".nav .glyphicon").removeClass("glyphicon-red");
        $(".nav .glyphicon-home").addClass("glyphicon-red");
      }
    });
  },
  
  // fullscreen: function () {
  //   if (screenfull.enabled) {
  //     console.log("fullscreen!");
  //     screenfull.request();
  //   }
  // },
  
  photoNew: function () {
    var router = this;
    var photo = new Silverprint.Models.Photo();
    
    var photoFormView = new Silverprint.Views.PhotoForm({
      model: photo
    });
    
    router._swapView(photoFormView);
    
    $(".nav .glyphicon").removeClass("glyphicon-red");
    $(".nav .glyphicon-camera").addClass("glyphicon-red");
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
        
        $(".nav .glyphicon").removeClass("glyphicon-red");
        $(".nav .glyphicon-user").addClass("glyphicon-red");
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
        
        $(".nav .glyphicon").removeClass("glyphicon-red");
      }
    });
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove() &&
        this._currentView.childViews && this._currentView.removeChildViews();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});