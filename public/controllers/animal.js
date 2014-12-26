define(['backbone', 'app', 'models/animal', 'collections/animals', 'views/compositeviews/animals', 'views/itemviews/animalupdate', 'views/itemviews/animalcreate'],
function(Backbone, App, AnimalModel, AnimalCollection, AnimalCompositeView, AnimalUpdateItemView, AnimalCreateItemView) {
  var AnimalController = Backbone.Marionette.Controller.extend({
    home: function() {
      var animals = new AnimalCollection();
      animals.fetch({
        success: function() {
          App.main.show(new AnimalCompositeView({collection: animals}));
        }
      });
    },
    update: function(id) {
      var animals = new AnimalCollection();
      animals.fetch({
        success: function() {
          var animal = animals.get(id);
          App.main.show(new AnimalUpdateItemView({model: animal}));
        }
      });
    },
    create: function() {
      App.main.show(new AnimalCreateItemView({model: new AnimalModel()}));
    }
  });
  return AnimalController;
});