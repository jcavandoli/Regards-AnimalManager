define(['backbone', 'models/animal'], function(Backbone, Animal) {
  // Mammal Model inherits from Animal
  var MammalModel = Animal.extend({
    initialize: function() {
      this.set('desc', this.growl() + ' et ma fourrure est ' + this.get('fur'));
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
    growl: function() {
      return this.speak();
    },
    url: function() {
      return this.id ? '/animals/' + this.id : '/animals';
    }
  });
  
  return MammalModel;
});