_(Backbone.View.prototype).extend({
  imageTag: function (url, options) {
    var html = "<img src=\"" + url + "\"";
    
    if (options) {
      if (options.className) {
        html += " class=\"" + options.className + "\"";
      } else if (options.id) {
        html += " id=\"" + options.id + "\"";
      }
    }
    
    html += ">";
    return html;
  },
  
  linkTo: function (label, url, options) {
    var html = "<a href=\"" + url + "\"";
    
    if (options) {
      if (options.className) {
        html += " class=\"" + options.className + "\"";
      } else if (options.id) {
        html += " id=\"" + options.id + "\"";
      }
    }
    
    html += ">" + label + "</a>";
    return html;
  }
});