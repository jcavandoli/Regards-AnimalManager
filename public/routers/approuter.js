define(['backbone', 'controllers/animal'],
function(Backbone, AnimalController) {
  var animalController = new AnimalController();
  
  var AppRouter = Backbone.Marionette.AppRouter.extend({
    controller: animalController,
    appRoutes: {
      '': 'home',
      "update/:id": 'update',
      'create': 'create'
    }
  });
  
  return AppRouter;
});