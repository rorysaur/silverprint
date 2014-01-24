Silverprint.Views.UserFeed = Backbone.View.extend({
  
  initialize: function () {
    this.mode = "vertical";
    this.childViews = [];
    this.listenTo(this.collection, "add remove reset destroy sync", this.render);
  },
  
  events: {
    "click #grid" : "toggleGrid",
    "click #vertical" : "toggleVertical",
    "click #refresh" : "refresh"
  },
  
  demoFlash: function () {
    var flash = $("<div>");
    flash.addClass("alert alert-info");
    flash.text(JST["alerts/feed"]());
    return flash;
  },
  
  refresh: function () {
    this.collection.fetch();
  },
  
  removeChildViews: function () {
    _(this.childViews).each(function (childView, index) {
      console.log("removing child #" + index + "...");
      childView.remove();
      childView.childViews && childView.removeChildViews();
    });
  },
  
  render: function (options) {
    var view = this;
    console.log("rendering feed...");
    view.$el.hide();
    
    var renderedContent = view.template({
      photos: view.collection,
      view: view
    });
    
    view.$el.html(renderedContent);
    
    if (view.collection.length == 0) {
      var flash = $("<div>").addClass("alert alert-info");
      flash.text("No photos to show. Follow some users to see photos in your feed!")
      view.$el.prepend(flash);
    }
    
    if (view.mode === "vertical") {
      var verticalView = new Silverprint.Views.Vertical({
        collection: view.collection,
        page: "feed"
      });
      
      view.childViews.push(verticalView);
      view.$("#photos").html(verticalView.render().$el);
      view.$("#vertical").addClass("active");
      
    } else if (view.mode === "grid") {
      var gridView = new Silverprint.Views.Grid({
        collection: view.collection
      });
      
      view.childViews.push(gridView);
      view.$("#photos").html(gridView.render().$el);
      view.$("#grid").addClass("active");
    }
    
    if (view.flash) {
      console.log("flash");
      view.$el.prepend(view.flash);
    }
    
    view.$el.fadeIn("slow");
    
    // view.rendered = true;
    return view;
  },
  
  template: JST["users/feed"],
  
  toggleGrid: function () {
    this.mode = "grid";
    this.render();
  },
  
  toggleVertical: function () {
    this.mode = "vertical";
    this.render();
  }
});