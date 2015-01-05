define(['backbone', 'underscore'], function(Backbone, _) {
  var AnimalModel = Backbone.Model.extend({
    validate: function(attrs, options) {
      var validTypes = ['reptil', 'mammal', 'bird'];
      var validGender = ['male', 'female'];

      var errors = {};
      
      if(!attrs.type) {
        errors.type = 'must be filled';
      }
      
      if(!attrs.gender) {
        errors.gender = 'must be filled';
      }
      
      if(_.indexOf(validGender, attrs.gender) === -1) {
        errors.gender = 'is not valid';
      }
      
      if(!_.indexOf(validTypes, attrs.type) === -1) {
        errors.type = 'is not valid';
      }
      
      if(!_.isEmpty(errors)) {
        return errors;
      }
    },
    getGenderSpecificPronoun: function() {
      return (this.get('gender') === 'female') ? 'une' : 'un';
    },
    speak: function() {
      return 'Je suis ' + this.getGenderSpecificPronoun() + ' ' + this.get('name');
    },
    url: function() {
      return this.id ? '/animals/' + this.id : '/animals';
    }
  });
  
  return AnimalModel;
});