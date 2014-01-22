Silverprint.Views.UserFeed = Backbone.View.extend({
  
  initialize: function () {
    this.mode = "vertical";
    this.childViews = [];
    this.listenTo(this.collection, "all", this.render)
  },
  
  events: {
    "click #grid" : "toggleGrid",
    "click #vertical" : "toggleVertical",
    "click #refresh" : "refresh"
  },
  
  removeChildViews: function () {
    _(this.childViews).each(function (childView, index) {
      console.log("removing child #" + index + "...");
      childView.remove();
      childView.childViews && childView.removeChildViews();
    });
  },
  
  refresh: function () {
    this.collection.fetch();
  },
  
  render: function () {
    var view = this;
    console.log("rendering...");
    
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