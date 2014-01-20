Silverprint.Views.UserShow = Backbone.View.extend({
  
  initialize: function () {
    this.photos = this.model.get("photos");
    this.listenTo(this.photos, "all", this.render);
    this.listenTo(this.model, "newFollow", this.render);
  },
  
  events: {
    "click .follow": "follow"
  },
  
  follow: function (event) {
    var view = this;
    event.preventDefault();
    var follow = new Silverprint.Models.Follow(view.model.id);
    follow.save({}, {
      success: function () {
        view.model.fetch({
          success: function () {
            view.model.trigger("newFollow");
          }
        });
      }
    });
  },
  
  render: function () {
    console.log("rendering");
    var view = this;
    
    var renderedContent = view.template({
      user: view.model,
      view: view,
      currentUser: Silverprint.currentUser
    });
    
    view.$el.html(renderedContent);
    
    view.photos.each(function (photo, index) {
      var photoView = new Silverprint.Views.PhotoDetail({
        model: photo,
        user: view.model
      });
      view.$('#photos').append(photoView.render().$el);
    });
    
    return view;
  },
  
  template: JST["users/show"]
});