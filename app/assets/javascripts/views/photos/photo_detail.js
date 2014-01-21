Silverprint.Views.PhotoDetail = Backbone.View.extend({
  
  initialize: function (options) {
    this.userAttrs = options.userAttrs;
  },
  
  events: {
    "click .delete": "delete"
  },
  
  delete: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      photo: view.model,
      userAttrs: view.userAttrs,
      view: view,
      currentUser: Silverprint.currentUser
    });
    
    view.$el.html(renderedContent);
    return view;
  },
  
  template: JST["photos/detail"]
  
});