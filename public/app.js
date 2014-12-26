define(['backbone', 'routers/approuter', 'collections/animals'],
function(Backbone, AppRouter, AnimalCollection) {
	var App = new Backbone.Marionette.Application();

	App.addRegions({
		header: '#header',
	  main: '#main'
	});

	App.addInitializer(function() {
    new AppRouter();
    Backbone.history.start();
	});

	return App;
});