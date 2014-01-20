Silverprint.Views.PhotoDetail = Backbone.View.extend({
  
  initialize: function (options) {
    this.user = options.user;
  },
  
  events: {
    "click .delete": "delete"
  },
  
  delete: function (event) {
    event.preventDefault();
    // var photoId = parseInt(event.currentTarget.attr("data-id"));
    this.model.destroy();
  },
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      photo: view.model,
      user: view.user,
      view: view,
      currentUser: Silverprint.currentUser
    });
    
    view.$el.html(renderedContent);
    return view;
  },
  
  template: JST["photos/detail"]
  
});