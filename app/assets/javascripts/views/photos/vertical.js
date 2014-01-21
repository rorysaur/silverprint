Silverprint.Views.Vertical = Backbone.View.extend({
  
  initialize: function (options) {
    this.childViews = [];
    this.page = options.page;
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
    
    view.collection.each(function (photo, index) {
      if (view.page === "show") {
        var userAttrs = view.model.attributes;
      } else {
        var userAttrs = photo.get("user");
      }

      var photoView = new Silverprint.Views.PhotoDetail({
        model: photo,
        userAttrs: userAttrs
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
  },
  
});