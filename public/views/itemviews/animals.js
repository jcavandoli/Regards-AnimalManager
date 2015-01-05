define(['backbone', 'handlebars'],
function(Backbone, Handlebars) {
  var AnimalItemView = Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile($('#item-template').html()),
    tagName: 'tr',
    ui: {
      deleteButton: '#delete',
      name: '#name'
    },
    events: {
      'click @ui.deleteButton': 'delete'
    },
    delete: function() {
      this.model.destroy();
    },
    onRender: function() {
      var type = this.model.get('type');
      this.ui.name.attr('class', getClassByType(type));
    }
  });

  var getClassByType = function(type) {
    if(type === 'bird') {
      return 'label label-default';
    } else if(type === 'reptil') {
      return 'label label-info';
    } else {
      return 'label label-danger';
    }
  };
  return AnimalItemView;
});