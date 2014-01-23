Silverprint.Views.Grid = Backbone.View.extend({
    
  initialize: function () {
    this.childViews = [];
    this.listenTo(this.collection, "add", this.render);
  },
  
  attributes: {
    "class" : "sortable list-unstyled"
  },
  
  events: {
    // "click .grid-photo" : "lightbox"
  },
  
  // lightbox: function (event) {
  //   var photoId = $(event.currentTarget).attr("data-id");
  //   $("#photoModal" + photoId).modal();
  // },
  // 
  // lightboxTemplate: JST["modals/lightbox"],
  
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

      // var lightboxModal = view.lightboxTemplate({
      //   photo: photo,
      //   view: view
      // });
      // 
      // view.$el.append(lightboxModal);
    });
  
    return view;
  },
  
  tagName: "ol"
  
  
});