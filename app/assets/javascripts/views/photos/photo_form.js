Silverprint.Views.PhotoForm = Backbone.View.extend({
  // 
  // attributes: {
  //   "enctype": "multipart/form-data"
  // },
  
  events: {
    "submit form" : "submit",
    "change input[type=file]" : "encodeFile"
  },
  
  encodeFile: function (event) {
    event.preventDefault();
    var view = this;
    var file = event.currentTarget.files[0];
    
    console.log(file);
    
    var reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target.result);
      view.model.set({ photo: e.target.result });
      // console.log(view.model);
    }
    
    reader.onerror = function(error) {
      console.log("error", error);
      console.log(error.getMessage());
    }
    
    reader.readAsDataURL(file);
  },
  
  render: function () {
    var view = this;
    
    var renderedContent = view.template({
      model: view.model
    });
    
    view.$el.html(renderedContent);
    return view;
  },
  
  submit: function (event) {
    event.preventDefault();
    console.log(this.model);
    // var attrs = $(event.currentTarget).serializeJSON();
    // console.log(this.model);
    // console.log(attrs);
    // this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate("#/");
      },
      
      error: function (xhr) {
        console.log(xhr);
      }
    })
  },
  
  // tagName: "form",
  
  template: JST["photos/form"]
});