Silverprint.Views.Vertical = Backbone.View.extend({
  
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
    
    view.collection.each(function (photo, index) {
      var photoView = new Silverprint.Views.PhotoDetail({
        model: photo,
        userAttrs: view.model.attributes
      });
      
      view.childViews.push(photoView);
      view.$el.append(photoView.render().$el);
    });
    
    return view;
  },
  
});