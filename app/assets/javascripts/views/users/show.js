Silverprint.Views.UserShow = Backbone.View.extend({
  
  initialize: function () {
    this.childViews = [];
    this.mode = "grid";
    this.photos = this.model.get("photos");
    this.listenTo(this.photos, "all", this.render);
    this.listenTo(this.model, "follow unfollow", this.render);
    this.listenTo(Silverprint.currentUser, "newProfilePic", this.render);
  },
  
  events: {
    "click a#change-profile-pic" : "showProfilePicForm",   
    "click .follow" : "follow",
    "click .unfollow" : "unfollow",
    "click #grid" : "toggleGrid",
    "click #vertical" : "toggleVertical"
  },
    
  follow: function (event) {
    var view = this;
    event.preventDefault();
    var follow = new Silverprint.Models.Follow({
      followedId: view.model.id
    });
    
    follow.save({}, {
      success: function () {
        view.model.fetch({
          success: function () {
            view.model.trigger("follow");
          }
        });
      }
    });
  },
  
  removeChildViews: function () {
    _(this.childViews).each(function (childView, index) {
      console.log("removing child #" + index + "...");
      childView.remove();
      childView.childViews && childView.removeChildViews();
    });
  },
  
  render: function (speed) {
    console.log("rendering");
    var view = this;
    view.$el.hide();
    
    var renderedContent = view.template({
      user: view.model,
      view: view,
      currentUser: Silverprint.currentUser
    });
    
    view.$el.html(renderedContent);
    
    if (view.mode === "vertical") {
      var verticalView = new Silverprint.Views.Vertical({
        model: view.model,
        collection: view.photos,
        page: "show"
      });
      
      view.childViews.push(verticalView);
      view.$("#photos").html(verticalView.render().$el);
      view.$("#vertical").addClass("active");
      
    } else if (view.mode === "grid") {
      var gridView = new Silverprint.Views.Grid({
        collection: view.photos
      });
      
      view.childViews.push(gridView);
      view.$("#photos").html(gridView.render().$el);
      view.$("#grid").addClass("active");
    }
    
    view.$el.fadeIn(speed || "slow");
    return view;
  },
  
  showProfilePicForm: function (event) {
    event.preventDefault();
    
    var formView = new Silverprint.Views.ProfilePicForm({
      model: this.model
    });
    
    this.childViews.push(formView);
    
    this.$("#profile-pic").html(formView.render().$el);
  },
  
  template: JST["users/show"],
  
  toggleGrid: function () {
    this.mode = "grid";
    this.render();
  },
  
  toggleVertical: function () {
    this.mode = "vertical";
    this.render();
  },
  
  unfollow: function (event) {
    var view = this;
    event.preventDefault();
    var follow = new Silverprint.Models.Follow(view.model.get("follow"));
    follow.urlRoot = "/api/follows";
    console.log(follow);
    if (follow) {
      follow.destroy({
        success: function () {
          view.model.fetch({
            success: function () {
              view.model.trigger("unfollow");
            }
          });
        }
      });
    }
  }
});