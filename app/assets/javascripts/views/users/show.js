Silverprint.Views.UserShow = Backbone.View.extend({
  
  events: {},
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      user: view.model,
      view: view,
      currentUser: Silverprint.currentUser
    });
    
    view.$el.html(renderedContent);
    
    // view.user.get('photos').each(function (photo) {
    //   var photoView = new Silverprint.Views.PhotoDetail({
    //     model: photo
    //   });
    //   view.$('#photos').append(photoView);
    // });
    
    return view;
  },
  
  template: JST["users/show"]
});