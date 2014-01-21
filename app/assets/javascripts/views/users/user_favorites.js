Silverprint.Views.UserFavorites = Backbone.View.extend({
  
  events: {},
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      photos: view.collection,
      view: view
    });
    
    view.$el.html(renderedContent);
    
    view.collection.each(function (photo) {
      var photoView = new Silverprint.Views.PhotoDetail({
        model: photo
      })
    });
    
    return view;
  },
  
  template: JST["users/favorites"]
});