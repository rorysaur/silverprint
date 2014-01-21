Silverprint.Views.PhotoDetail = Backbone.View.extend({
  
  initialize: function (options) {
    this.userAttrs = options.userAttrs;
    this.listenTo(this.model, "like unlike", this.render)
  },
  
  events: {
    "click .delete": "delete",
    "click .like": "like",
    "click .unlike": "unlike"
  },
  
  delete: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  
  like: function (event) {
    event.preventDefault();
    var view = this;
    
    var like = new Silverprint.Models.Like({
      photoId: view.model.id
    });
    
    like.save({}, {
      success: function () {
        view.model.fetch({
          success: function () {
            console.log(view.model);
            view.model.trigger("like");
          }
        });
      },
      
      error: function (xhr) {
        console.log(xhr);
      }
    });
  },
    
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      photo: view.model,
      userAttrs: view.userAttrs,
      view: view,
      currentUser: Silverprint.currentUser
    });
    
    view.$el.html(renderedContent);
    return view;
  },
  
  template: JST["photos/detail"],
  
  unlike: function (event) {
    event.preventDefault();
    var view = this;
    var likeAttrs = view.model.get("likes").filter(function (like) {
      return like.userId == Silverprint.currentUser.id;
    })[0];
    
    var like = new Silverprint.Models.Like(likeAttrs);
    like.urlRoot = "/api/likes";
    
    like.destroy({
      success: function () {
        view.model.fetch({
          success: function () {
            view.model.trigger("unlike");
          }
        });
      },
      
      error: function (xhr) {
        console.log(xhr);
      }
    });
  }
  
});