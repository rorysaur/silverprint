Silverprint.Views.UsersIndex = Backbone.View.extend({
  
  initialize: function () {
    this.childViews = [];
    this.listenTo(this.collection, "add remove reset destroy sync", this.render);
  },
  
  events: {
    
  },
  
  removeChildViews: function () {
    _(this.childViews).each(function (childView, index) {
      console.log("removing child #" + index + "...");
      childView.remove();
    });
  },
  
  render: function (speed) {
    var view = this;
    if (!view.rendered) {
      view.$el.hide();
    }
    
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
    
    view.rendered = true;
    view.$el.fadeIn(speed || "slow");
    return view;
  },
  
  template: JST["users/index"]
});