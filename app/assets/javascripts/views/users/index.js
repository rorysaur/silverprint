Silverprint.Views.UsersIndex = Backbone.View.extend({
  
  initialize: function () {
    this.listenTo(this.collection, "all", this.render);
  },
  
  events: {
    
  },
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      users: view.collection
    });
    
    view.$el.html(renderedContent);

    // view.collection.each(function (user) {
//       var userView = new Silverprint.Views.UserRow({
//         model: user
//       });
//       view.$("table").append(userView.render().$el);
//     });
    
    return view;
  },
  
  template: JST["users/index"]
});