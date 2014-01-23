Silverprint.Views.PhotoForm = Backbone.View.extend({
  
  attributes: {
    "enctype" : "multipart/form-data"
  },
  
  events: {
    "submit" : "submit",
    "change input[type=file]" : "handleFile",
    "click #crop" : "crop",
    "click .close" : "back"
  },
  
  back: function (event) {
    this.$("#newPhotoModal").modal("hide");
    $(".modal-backdrop").remove();
    window.history.back();
  },
  
  crop: function (event) {
    var view = this;
    event && event.preventDefault();
    
    if (!view.cropping) {
      view.jcropApi = $.Jcrop("#preview", {
        boxWidth: 500,
        boxHeight: 500,
        onSelect: view.fillCoords,
        setSelect: [0, 0, 300, 300],
        aspectRatio: 1
      });
      view.$("#crop").addClass("active");
      view.$("#choose").hide();
    } else {
      view.jcropApi.destroy();
      view.$("#crop").removeClass("active");
      view.$("#choose").show();
    }
    
    view.cropping = !view.cropping;
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
      view.$(".thumbnail").hide();
      view.$("#preview").attr("src", e.target.result);
      view.$(".thumbnail").show();
      view.$("#crop").show();
      view.crop();
    }
    
    reader.onerror = function(error) {
      console.log("error", error);
      console.log(error.getMessage());
    }
    
    reader.readAsDataURL(file);
  },
  
  render: function (speed) {
    var view = this;
    
    var renderedContent = view.template({
      model: view.model
    });
 
    view.$el.html(renderedContent);
    view.$(".thumbnail").hide();
    view.$("#crop").hide();
    view.$("#newPhotoModal").modal({
      backdrop: "static"
    });

    return view;
  },
  
  submit: function (event) {
    var view = this;
    event.preventDefault();
    console.log("submitting...");
    
    var attrs = view.$el.serializeJSON();
    view.model.set(attrs.photo);
    console.log(view.model.attributes);
    
    var spinner = new Spinner().spin(view.$(".thumbnail")[0]);
    view.model.save({}, {
      success: function () {
        spinner.stop();
        view.$("#newPhotoModal").hide();
        $(".modal-backdrop").remove();
        Backbone.history.navigate("#/");
      },
      
      error: function (xhr) {
        console.log(xhr);
      }
    });
  },
  
  tagName: "form",
  
  template: JST["modals/new_photo"]
});