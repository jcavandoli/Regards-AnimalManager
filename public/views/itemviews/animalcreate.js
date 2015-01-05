define(['backbone', 'handlebars'],
function(Backbone, Handlebars) {
  var UpdateView = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    template: Handlebars.compile($('#create-template').html()),
    ui: {
      dataFields: 'input',
      type: '#type',
      gender: '#gender',
      saveButton: 'button#save',
      backButton: 'button#back',
      descriptionLabel: 'label#description',
      descriptionInput: 'input#description'
    },
    events: {
      'click @ui.saveButton': 'save',
      'click @ui.backButton': 'back',
      'change @ui.type': 'selectType'
    },
    back: function() {
      Backbone.history.history.back();
    },
    save: function() {
      var self = this;
      this.ui.dataFields.each(function() {
        // Each attribute name is the property name of the object
        self.model.set($(this).attr('name'), $(this).val());
      });
      
      // Set the value from the selected type
      this.model.set('type', this.ui.type.val());
      
      // Set the value from the selected type
      this.model.set('gender', $(this.ui.gender).val());

      this.model.save();

      Backbone.history.history.back();
    },
    selectType: function() {
      var type = $(this.ui.type).val();
      var descriptionName = getDescriptionName(type);

      // Change description field label text
      this.ui.descriptionLabel.text('Description ' + descriptionName.displayName);
      
      // Change the name attribute name of the description field 
      // with the specific property name (fur, feathers or scale)
      this.ui.descriptionInput.attr('name', descriptionName.propertyName);
    },
    onRender: function() {
      this.selectType();
    }
  });
  
  var getDescriptionName = function(type) {
    if(type === 'bird') {
      return {
        propertyName: 'feathers',
        displayName: 'du plumage'
      };
    } else if(type === 'reptil') {
      return {
        propertyName: 'scale',
        displayName: 'des écailles' 
      };
    } else {
      return {
        propertyName: 'fur',
        displayName: 'de la fourrure'
      };
    }
  };

  return UpdateView;
});