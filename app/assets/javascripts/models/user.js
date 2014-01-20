Silverprint.Models.User = Backbone.Model.extend({
  
  parse: function (data) {
    var photos = data.photos;
    data.photos = new Silverprint.Collections.UserPhotos(photos, {
      userId: data.id
    });
    console.log(data);
    return data;
  },
  
  toJSON: function () {
    var data = _.clone(this.attributes);
    data.photos = this.get('photos').toJSON();
    return data;
  }
  
  validate: function (attrs) {  }
});