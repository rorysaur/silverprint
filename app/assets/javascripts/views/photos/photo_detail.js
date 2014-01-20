Silverprint.Views.PhotoDetail = Backbone.View.extend({
  
  events: {},
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      photo: view.model,
      view: view,
      currentUser: Silverprint.currentUser
    });
    
    view.$el.html(renderedContent);
    return view;
  },
  
  template: JST["photos/detail"]
});