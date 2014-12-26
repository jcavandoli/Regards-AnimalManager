define(['backbone', 'handlebars', 'views/itemviews/animals'],
function(Backbone, Handlebars, AnimalItemView) {
  var AnimalCompositeView = Backbone.Marionette.CompositeView.extend({
    template: Handlebars.compile($('#composite-template').html()),
    childView: AnimalItemView,
    childViewContainer: 'tbody'
  });
  
  return AnimalCompositeView;  
});