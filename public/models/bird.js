define(['backbone', 'models/animal'], function(Backbone, Animal) {
  // Bird Model inherits from Animal
  var BirdModel = Animal.extend({
    initialize: function() {
      this.set('desc', this.tweet() + ' et mon plumage est ' + this.get('feathers'));
    },
    // Override from parent
    validate: function(attrs, options) {
      // Call super method
      var errors = Animal.prototype.validate.call(this, attrs, options);
      
      if(!errors) {
        errors = {};
      }
      
      if(!_.isEmpty(errors)) {
        return errors;
      }
    },
    tweet: function() {
      return this.speak();
    },
    url: function() {
      return this.id ? '/animals/' + this.id : '/animals';
    }
  });
  
  return BirdModel;
});