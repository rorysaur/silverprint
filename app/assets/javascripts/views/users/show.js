Silverprint.Views.UserShow = Backbone.View.extend({
  
  initialize: function () {
    this.childViews = [];
    this.mode = "grid";
    this.photos = this.model.get("photos");
    this.listenTo(this.photos, "add", this.render);
    this.listenTo(this.model, "follow unfollow", this.render);
    this.listenTo(Silverprint.currentUser, "newProfilePic", this.render);
  },
  
  events: {
    "click .show-follow" : "showUsers",
    "click .follow" : "follow",
    "click .unfollow" : "unfollow",
    "click #grid" : "toggleGrid",
    "click #vertical" : "toggleVertical",
    "click #sort" : "toggleSort"
  },
  
  demoFlash: function () {
    var flash = $("<div>");
    flash.addClass("alert alert-success");
    flash.text(JST["alerts/show"]());
    return flash;
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
  
  profilePicForm: function (event) {
    event.preventDefault();
    console.log("profile pic!");
    Backbone.history.navigate("#profile");
  },
  
  removeChildViews: function () {
    _(this.childViews).each(function (childView, index) {
      console.log("removing child #" + index + "...");
      childView.remove();
      childView.childViews && childView.removeChildViews();
    });
  },
  
  render: function (options) {
    console.log("rendering show...");
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
      view.$("#sort").hide();
      
    } else if (view.mode === "grid") {
      var gridView = new Silverprint.Views.Grid({
        collection: view.photos
      });
      
      view.childViews.push(gridView);
      view.$("#photos").html(gridView.render().$el);
      view.$("#grid").addClass("active");
    }
    
    if (view.flash) {
      view.$el.prepend(view.flash);
    }
    
    view.$el.fadeIn("slow");
    
    // view.rendered = true;
    return view;
  },
  
  showUsers: function (event) {
    var view = this;
    event.preventDefault();
    view.$("#sort").hide();
    view.$("#photos").hide();
    
    var renderedTable = view.showUsersTemplate();
    view.$("#photos").html(renderedTable);
    
    var allUsers = new Silverprint.Collections.AllUsers();
    
    allUsers.fetch({
      success: function () {
        if ($(event.currentTarget).attr("id") == "num-followers") {
          var users = allUsers.models.filter(function (user) {
            return view.model.isFollowedBy(user);
          });
        } else if ($(event.currentTarget).attr("id") == "num-following") {
          var users = allUsers.models.filter(function (user) {
            return user.isFollowedBy(view.model);
          });
        }
        
        _(users).each(function (user) {
          var userView = new Silverprint.Views.UserRow({
            model: user
          });
          view.childViews.push(userView);
          view.$("table").append(userView.render().$el);
        });
        
        view.$("#photos").fadeIn("slow");
        return view;
      }
    });
  },
  
  showUsersTemplate: JST["users/index"],
  
  template: JST["users/show"],
  
  toggleGrid: function () {
    this.mode = "grid";
    this.render();
  },
  
  toggleVertical: function () {
    this.mode = "vertical";
    this.render();
  },
  
  toggleSort: function (event) {
    event.preventDefault();
      console.log("here");
    
    if (!this.sorting) {
      this.$("ol").sortable({
        onDrop: this.updateOrder.bind(this)
      });
      this.$("li").addClass("sortable-element");
      this.$("#sort").addClass("glyphicon-blue");
      this.sorting = true;
    } else {
      this.$el.sortable("disable");
      this.$("li").removeClass("sortable-element");
      this.$("#sort").removeClass("glyphicon-blue");
      this.sorting = false;
    }
    
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
  },
  
  updateOrder: function ($item) {
    var view = this;
    
    $item.removeClass("dragged").removeAttr("style");
    $("body").removeClass("dragging");
    
    var photoId = $item.find(".grid-photo").attr("data-id");
    
    var prevId = parseInt($item.prev().find(".grid-photo").attr("data-id"));
    var nextId = parseInt($item.next().find(".grid-photo").attr("data-id"));
    
    var photo = view.photos.get(photoId);
    var prevPhoto = view.photos.get(prevId);
    var nextPhoto = view.photos.get(nextId);
    
    if (prevPhoto && nextPhoto) {
      photo.set({ orderId: (prevPhoto.get("orderId") + nextPhoto.get("orderId")) / 2 });
    } else if (prevPhoto) {
      photo.set({ orderId: prevPhoto.get("orderId") - 1});
    } else if (nextPhoto) {
      photo.set({ orderId: nextPhoto.get("orderId") + 1});
    }
    
    photo.save({}, {
      success: function () {
        view.photos.add(photo, { merge: true });
      },
      
      error: function (obj) {
        console.log(obj);
      }
    });
  }
});