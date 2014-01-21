Silverprint.Views.UsersIndex = Backbone.View.extend({
  
  initialize: function () {
    this.childViews = [];
    this.listenTo(this.collection, "all", this.render);
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
      users: view.collection
    });
    
    view.$el.html(renderedContent);

    view.collection.each(function (user) {
      var userView = new Silverprint.Views.UserRow({
        model: user
      });
      view.childViews.push(userView);
      view.$("table").append(userView.render().$el);
    });
    
    return view;
  },
  
  template: JST["users/index"]
});