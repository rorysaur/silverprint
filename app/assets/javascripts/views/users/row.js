Silverprint.Views.UserRow = Backbone.View.extend({
  
  initialize: function () {
    this.listenTo(this.model, "follow unfollow", this.render);
  },
  
  events: {
    "click .follow": "follow",
    "click .unfollow": "unfollow"
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
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      user: view.model,
      view: view
    });
    
    view.$el.html(renderedContent);
    return view;
  },
  
  tagName: "tr",
  
  template: JST["users/row"],
  
  unfollow: function (event) {
    var view = this;
    event.preventDefault();
    
    var follow = new Silverprint.Models.Follow(view.model.get("follow"));
    follow.urlRoot = "/api/follows";

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