Silverprint.Views.UserRow = Backbone.View.extend({
  
  initialize: function () {
    this.listenTo(this.model, "all", this.render);
  },
  
  events: {
    
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
  
  template: JST["users/row"]
});