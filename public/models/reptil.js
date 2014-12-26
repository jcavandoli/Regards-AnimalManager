define(['backbone', 'models/animal'], function(Backbone, Animal) {
  // Reptil Model inherits from Animal
  var ReptilModel = Animal.extend({
    initialize: function() {
      this.set('desc', this.hiss() + ' et mes écailles sont ' + this.get('scale'));
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
    hiss: function() {
      return this.speak();
    },
    url: function() {
			return this.id ? '/animals/' + this.id : '/animals';
		}
  });
  
  return ReptilModel;
});