define(['backbone', 'models/bird', 'models/mammal', 'models/reptil', 'models/animal'],
function(Backbone, Bird, Mammal, Reptil, Animal) {
  var AnimalsCollection = Backbone.Collection.extend({
    model: function(attrs, options) {
      if(attrs.type === 'bird') {
        return new Bird(attrs, options);
      } else if(attrs.type === 'mammal') {
        return new Mammal(attrs, options);
      } else if(attrs.type === 'reptil') {
        return new Reptil(attrs, options);
      } else {
        return new Animal(attrs, options);
      }
    },
    url: 'animals',
		urlRoot: 'animals'
  });
  return AnimalsCollection;
});