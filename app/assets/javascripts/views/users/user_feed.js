Silverprint.Views.UserFeed = Backbone.View.extend({
  
  initialize: function () {
    this.mode = "vertical";
    this.childViews = [];
    this.listenTo(this.collection, "add remove reset destroy sync", this.render);
  },
  
  events: {
    "click .popover-content" : "dismissPopovers",
    "click #grid" : "toggleGrid",
    "click #vertical" : "toggleVertical",
    "click #refresh" : "refresh"
  },
  
  showPopovers: function () {
    var view = this;
    console.log("showing popovers...");
    _(view.popoverTargets()).each(function ($target, index) {
      console.log($target);
      $target.popover({
        placement: "bottom",
        content: view.popovers[index]
      });
      $target.popover("show");
    });
        
  },
  
  dismissPopovers: function (event) {
    var view = this;
    event.preventDefault();
    
    _(view.popoverTargets()).each(function ($target, index) {
      $target.popover("destroy");
    });
  },
  
  popovers: [
    "This is your feed page. Toggle between vertical and grid view styles, refresh the feed, or browse in fullscreen mode (might not work on all browsers). (Click to dismiss all)",
    "Like or fullscreen individual photos.",
    "Check out your profile page."
  ],
  
  popoverTargets: function () {
    var targets = [
      $("#toggle-view"),
      $(".btn-group-vertical").first(),
      $(".username")
    ];
    
    return targets;
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
  
  render: function (speed) {
    var view = this;
    console.log("rendering...");
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
    
    view.$el.fadeIn(speed || "slow");
    
    if (Silverprint.currentUser.isDemoUser()) {
      view.showPopovers();
    }
    
    view.rendered = true;
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