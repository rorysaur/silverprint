Silverprint.Views.UserFavorites = Backbone.View.extend({
  
  initialize: function () {
    this.mode = "grid";
    this.childViews = [];
    this.listenTo(Silverprint.currentUser, "unlike", this.removePhoto);
    this.listenTo(this.collection, "add remove reset destroy sync", this.render);
  },
  
  events: {
    "click #grid" : "toggleGrid",
    "click #vertical" : "toggleVertical"
  },
  
  demoFlash: function () {
    var flash = $("<div>");
    flash.addClass("alert alert-info");
    flash.text(JST["alerts/favorites"]());
    return flash;
  },
  
  removeChildViews: function () {
    _(this.childViews).each(function (childView, index) {
      console.log("removing child #" + index + "...");
      childView.remove();
      childView.childViews && childView.removeChildViews();
    });
  },
  
  removePhoto: function () {
    var view = this;
    
    view.collection.fetch({
      success: function () {
        view.render();
      }
    });
  },
  
  render: function (options) {
    var view = this;
    view.$el.hide();
    
    var renderedContent = view.template({
      photos: view.collection,
      view: view
    });
    
    view.$el.html(renderedContent);
    
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
      view.$el.prepend(view.flash);
    }

    view.$el.fadeIn("slow");
    
    view.rendered = true;
    return view;
  },
  
  template: JST["users/favorites"],
  
  toggleGrid: function () {
    this.mode = "grid";
    this.render();
  },
  
  toggleVertical: function () {
    this.mode = "vertical";
    this.render();
  }
});