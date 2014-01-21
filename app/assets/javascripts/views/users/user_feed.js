Silverprint.Views.UserFeed = Backbone.View.extend({
  
  initialize: function () {
    this.childViews = [];
    this.listenTo(this.collection, "all", this.render)
  },
  
  events: {
    
  },
  
  removeChildViews: function () {
    _(this.childViews).each(function (childView, index) {
      console.log("removing child #" + index + "...");
      childView.remove();
    });
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
      
      view.childViews.push(photoView);
      view.$("#photos").append(photoView.render().$el);
    });
    
    return view;
  },
  
  template: JST["users/feed"]
});