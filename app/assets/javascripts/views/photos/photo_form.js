Silverprint.Views.PhotoForm = Backbone.View.extend({
  
  initialize: function (options) {
    this.photoType = options.photoType;
  },
  
  attributes: {
    "enctype" : "multipart/form-data"
  },
  
  events: {
    "click .popover" : "dismissPopovers",
    "submit" : "submit",
    "change input[type=file]" : "handleFile",
    "click #crop" : "crop",
    "click #preview-url" : "handleUrl",
    "click .close" : "back"
  },
  
  showPopovers: function () {
    var view = this;
    _(view.popoverTargets()).each(function ($target, index) {
      $target.popover({
        placement: "top",
        content: view.popovers[index],
      });
      $target.popover("show");
    });
  },
  
  dismissPopovers: function (event) {
    var view = this;
    event.preventDefault();    
    _(view.popoverTargets()).each(function ($target, index) {
      $target.popover("destroy");
    });    
  },
  
  popovers: [
    "Add a photo from your computer or from the internets, or try the default URL. (Crop only works on file uploads at the moment.)"
  ],
  
  popoverTargets: function () {
    var targets = [
      this.$("#url")
    ];
    
    return targets;
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
      view.$(".photo-input").hide();
    } else {
      view.jcropApi.destroy();
      view.$("#crop").removeClass("active");
      view.$(".photo-input").show();
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
      if (view.photoType == "photo") {
        view.model.set({ photo: e.target.result }); 
      } else if (view.photoType == "profile") {
        view.model.set({ profile_pic: e.target.result })
      }
      view.photoSet = true;
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
  
  handleUrl: function (event) {
    event.preventDefault();
    var view = this;
    
    var url = $("#url").val();
      
    view.$(".thumbnail").hide();
    view.$("#preview").attr("src", url);
    view.$(".thumbnail").show();
  },
  
  render: function (speed) {
    var view = this;
    
    var renderedContent = view.template({
      model: view.model
    });
 
    view.$el.html(renderedContent);
    
    if (Silverprint.currentUser.isDemoUser) {
    view.$("#url").val("http://placekitten.com/400/400");
    }
    
    view.$(".thumbnail").hide();
    view.$("#crop").hide();
    view.$("#newPhotoModal").modal({
      backdrop: "static"
    });
    
    if (Silverprint.currentUser.isDemoUser()) {
      view.showPopovers();
    }

    return view;
  },
  
  submit: function (event) {
    var view = this;
    event.preventDefault();
    console.log("submitting...");
    
    if (!view.photoSet) {
      var url = $("#url").val();
    
      if (view.photoType == "photo") {
        view.model.set({ photo_url: url }); 
      } else if (view.photoType == "profile") {
        view.model.set({ profile_pic_url: url })
      }
    }
    
    var attrs = view.$el.serializeJSON();
    view.model.set(attrs.photo);
    console.log(view.model.attributes);
    
    var spinner = new Spinner().spin(view.$(".thumbnail")[0]);
    view.model.save({}, {
      success: function () {
        spinner.stop();
        view.$("#newPhotoModal").hide();
        $(".modal-backdrop").remove();
        if (view.photoType == "photo") {
          Backbone.history.navigate("#/");
        } else if (view.photoType == "profile") {
          window.history.back();
        }
      },
      
      error: function (model, xhr) {
        spinner.stop();
        console.log(xhr);
        $error = $("<div>");
        $error.addClass("alert alert-danger").html("Whoops! Something went wrong.");
        view.$(".modal-body").prepend($error);
      }
    });
  },
  
  tagName: "form",
  
  template: JST["modals/new_photo"]
});