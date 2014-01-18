_(Backbone.View.prototype).extend({
  imageTag: function (url) {
    return "<img src=\"" + url + "\">";
  },
  
  linkTo: function (label, url) {
    return "<a href=\"" + url + "\">" + label + "</a>";
  }
});