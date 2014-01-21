Silverprint.Views.Grid = Backbone.View.extend({
    
  initialize: function () {
    this.childViews = [];
  },
  
  attributes: {
    "class" : "row"
  },
  
  events: {},
  
  removeChildViews: function () {
    _(this.childViews).each(function (childView, index) {
      console.log("removing child #" + index + "...");
      childView.remove();
    });
  },
  
  render: function () {
    var view = this;
        
    view.collection.each(function (photo) {
      var photoView = new Silverprint.Views.GridDetail({
        model: photo,
      });
      
      view.childViews.push(photo);
      view.$el.append(photoView.render().$el);
    });
    
    return view;
  }
  
});