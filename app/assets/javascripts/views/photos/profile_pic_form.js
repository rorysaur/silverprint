Silverprint.Views.ProfilePicForm = Backbone.View.extend({

  attributes: {
    "enctype" : "multipart/form-data"
  },
  
  events: {
    "submit" : "submit",
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
      view.model.set({ profile_pic: e.target.result });
      view.$("#preview").attr("src", e.target.result);
      view.$("#preview").show();
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
      model: view.model,
    });
    
    view.$el.html(renderedContent);
    view.$("#preview").hide();
    return view;
  },
  
  submit: function (event) {
    var view = this;
    event.preventDefault();
    console.log("submitting...");
    
    var spinner = new Spinner().spin($(".pull-left.photo-container")[0]);
    view.model.save({}, {
      success: function (model, response) {
        spinner.stop();
        Silverprint.currentUser.set({ profilePicUrl: response.profilePicUrl });
        Silverprint.currentUser.trigger("newProfilePic");
      },
      
      error: function (xhr) {
        console.log(xhr);
      }
    });
  },
  
  tagName: "form",
  
  template: JST["photos/profile"]
  
});