Silverprint.Views.PhotoForm = Backbone.View.extend({
  
  attributes: {
    "enctype" : "multipart/form-data"
  },
  
  events: {
    "submit" : "submit",
    "change input[type=file]" : "handleFile"
  },
  
  fillCoords: function (coords) {
    $('#x').val(coords.x);
  	$('#y').val(coords.y);
  	$('#width').val(coords.w);
  	$('#height').val(coords.h);
  },
  
  handleFile: function (event) {
    event.preventDefault();
    var view = this;
    var file = event.currentTarget.files[0];
    
    console.log(file);
    
    var reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target.result);
      view.model.set({ photo: e.target.result });
      view.$("#preview").attr("src", e.target.result);
      view.$("#preview").show();
      $(function ($) {
        $("#preview").Jcrop({
          onSelect: view.fillCoords,
          setSelect: [ 0, 0, 300, 300],
          aspectRatio: 1
        });
      });
    }
    
    reader.onerror = function(error) {
      console.log("error", error);
      console.log(error.getMessage());
    }
    
    reader.readAsDataURL(file);
  },
  
  render: function (speed) {
    var view = this;
    view.$el.hide();
    
    var renderedContent = view.template({
      model: view.model
    });
    
    view.$el.html(renderedContent);
    view.$("#preview").hide();
    view.$el.fadeIn(speed || "slow");
    return view;
  },
  
  submit: function (event) {
    event.preventDefault();
    console.log("submitting...");
    
    var attrs = this.$el.serializeJSON();
    this.model.set(attrs.photo);
    console.log(this.model.attributes);
    
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate("#/");
      },
      
      error: function (xhr) {
        console.log(xhr);
      }
    });
  },
  
  tagName: "form",
  
  template: JST["photos/form"]
});