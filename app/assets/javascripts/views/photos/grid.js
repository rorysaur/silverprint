Silverprint.Views.Grid = Backbone.View.extend({
    
  initialize: function () {
    this.childViews = [];
  },
  
  attributes: {
    "class" : "row"
  },
  
  events: {
    "click .photo" : "lightbox"
  },
  
  lightbox: function (event) {
    console.log($(event.currentTarget).attr("data-id"));
    var photoId = $(event.currentTarget).attr("data-id");
    $("#photoModal" + photoId).modal();
  },
  
  lightboxTemplate: JST["modals/lightbox"],
  
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
      
      view.childViews.push(photoView);
      view.$el.append(photoView.render().$el);
      
      var lightboxModal = view.lightboxTemplate({
        photo: photo,
        view: view
      });
      
      view.$el.append(lightboxModal);
    });
    
    return view;
  }
  
});