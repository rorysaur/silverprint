Silverprint.Views.UserShow = Backbone.View.extend({
  
  events: {},
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      user: view.model,
      currentUser: Silverprint.currentUser
    });
    
    view.$el.html(renderedContent);
    
    view.user.get('photos');
    return view;
  },
  
  template: JST["users/show"]
});