Silverprint.Views.GridDetail = Backbone.View.extend({
  
  attributes: {
    "class" : "col-xs-12 col-sm-6 col-md-4"
  },
  
  events: {},
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      photo: view.model,
      view: view
    });
    
    view.$el.html(renderedContent);
    return view;
  },
  
  template: JST["photos/grid_detail"]
});