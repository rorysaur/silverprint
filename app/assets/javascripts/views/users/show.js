Silverprint.Views.UserShow = Backbone.View.extend({
  
  initialize: function () {
    this.photos = this.model.get("photos");
  },
  
  events: {},
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      user: view.model,
      view: view,
      currentUser: Silverprint.currentUser
    });
    
    view.$el.html(renderedContent);
    
    view.photos.each(function (photo, index) {
      var photoView = new Silverprint.Views.PhotoDetail({
        model: photo,
        user: view.model
      });
      view.$('#photos').append(photoView.render().$el);
    });
    
    return view;
  },
  
  template: JST["users/show"]
});