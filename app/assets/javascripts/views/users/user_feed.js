Silverprint.Views.UserFeed = Backbone.View.extend({
  
  initialize: function () {
    this.listenTo(this.collection, "all", this.render)
  },
  
  events: {
    
  },
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      photos: view.collection,
      view: view
    });
    
    view.$el.html(renderedContent);

    view.collection.each(function (photo) {
      var photoView = new Silverprint.Views.PhotoDetail({
        model: photo,
        userAttrs: photo.get("user"),
      });
      
      view.$("#photos").append(photoView.render().$el);
    });
    
    return view;
  },
  
  template: JST["users/feed"]
});