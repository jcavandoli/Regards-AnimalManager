require.config({
	baseUrl: '/',
  deps: ['backbone.marionette', 'scripts/main'],
  paths: {
    'jquery': '../vendor/jquery/dist/jquery',
    'underscore': '../vendor/underscore/underscore',
    'backbone': '../vendor/backbone/backbone',
    'backbone.marionette': '../vendor/backbone.marionette/lib/core/backbone.marionette',
    'backbone.wreqr': '../vendor/backbone.wreqr/lib/backbone.wreqr',
    'backbone.babysitter': '../vendor/backbone.babysitter/lib/backbone.babysitter',
    'handlebars': '../vendor/handlebars/handlebars.min'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },
    marionette: {
      exports: 'Backbone.Marionette',
      deps: ['backbone']
    }
  }
});