Silverprint.Views.UsersIndex = Backbone.View.extend({
  
  initialize: function () {
    this.childViews = [];
    this.listenTo(this.collection, "add remove reset destroy sync", this.render);
  },
  
  events: {
    
  },
  
  demoFlash: function () {
    var flash = $("<div>");
    flash.addClass("alert alert-info");
    flash.text(JST["alerts/index"]());
    return flash;
  },
  
  removeChildViews: function () {
    _(this.childViews).each(function (childView, index) {
      console.log("removing child #" + index + "...");
      childView.remove();
    });
  },
  
  render: function (options) {
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
    
    if (view.flash) {
      view.$el.prepend(view.flash);
    }

    view.$el.fadeIn("slow");
    
    view.rendered = true;
    return view;
  },
  
  template: JST["users/index"]
});