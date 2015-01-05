define(['backbone', 'handlebars'],
function(Backbone, Handlebars) {
  var UpdateView = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    template: Handlebars.compile($('#update-template').html()),
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
      var type = $(this.ui.type).val();

      if(this.model.get('type') !== type) { // Type changed
        // Remove old specific type property
        if(this.model.get('type') === 'bird') {
          this.model.unset('feathers');
        } else if(this.model.get('type') === 'reptil') {
          this.model.unset('scale');
        } else {
          this.model.unset('fur');
        }
      }

      this.model.unset('desc');
      
      var self = this;
      this.ui.dataFields.each(function() {
        // Each attribute name is the property name of the object
        self.model.set($(this).attr('name'), $(this).val());
      });

      // Get and set the value from the selected type
      self.model.set('type', $(this.ui.type).val());
      
      // Get and set the value from the selected type
      self.model.set('gender', $(this.ui.gender).val());

      self.model.save();

      Backbone.history.history.back()
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
      var self = this;
      
      // Loop throught the options to set the current type selected
      this.ui.type.find('option').each(function(i, opt) {
          if(opt.value === self.model.get('type')) {
            $(opt).attr('selected', 'selected');
          }
      });

      // Loop throught the options to set the current gender selected
      this.ui.gender.find('option').each(function(i, opt) {
        if(opt.value === self.model.get('gender')) {
          $(opt).attr('selected', 'selected');
        }
      });
      
      var descriptionName = getDescriptionName(this.model.get('type'));

      this.ui.descriptionInput.attr('value', this.model.get(descriptionName.propertyName));
      
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