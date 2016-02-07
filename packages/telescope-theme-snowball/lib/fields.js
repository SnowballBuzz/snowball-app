//Channels
Categories.removeField(['order', 'slug', 'image', 'parentId']);
Categories.addField({
  fieldName: 'isPrivate',
  fieldSchema: {
    label: 'Make this private',
    defaultValue: 0,
    type: Number,
    autoform: {
      type: "select-radio-inline",
      options: function () {
        return [
          {label: "Public", value: 0},
          {label: "Private", value: 1}
        ];
      }
    }
  }
});
Categories.addField({
  fieldName: 'allowedDomains',
  fieldSchema: {
    type: String,
    label: 'Allowed website domains (one per line):',
    defaultValue: '',
    autoform: {
      type: "textarea",
      placeholder: 'example.com, example.net, etc...',
      custom: function () {
        if (this.isPrivate) {
          return "required";
        }
      }
    }
  }
});
Categories.addField({
  fieldName: 'allowedEmails',
  fieldSchema: {
    type: String,
    label: 'Allowed email addresses (one per line):',
    defaultValue: '',
    autoform: {
      type: "textarea",
      placeholder: 'name@example.com, name@example.net, etc...',
      custom: function () {
        if (this.isPrivate) {
          return "required";
        }
      }
    }
  }
});
Categories.addField({
  //urls & domains
  fieldName: 'userId',
  fieldSchema: {
    type: String,
    autoValue: function () {
      return Meteor.userId();
    },
  }
});


Posts.removeField(['categories', 'thumbnailUrl']);
Posts.addField({
  fieldName: 'categories',
  fieldSchema: {
    type: [String],
    optional: false,
    editableBy: ["member", "admin"],
    label: 'Select a Channel',
    autoform: {
      afFieldInput: {
        type: 'select2',
        multiple: true,
        options: function () {
          var categories = Categories.find().map(function (category) {
            return {
              value: category._id,
              label: category.name
            };
          });
          return categories;
        }
      }
    }
  }
});


//Posts.removeField();
Posts.addField({
  fieldName: 'shares',
  fieldSchema: {
    type: Number,
    optional: true,
    autoform: {
      omit: true
    }
  }
});

Posts.removeField("url");
Posts.removeField("title");
Posts.addField({
  fieldName: 'title',
  fieldSchema: {
    type: String,
    optional: true,
    //max: 120,
    editableBy: ["member", "admin"],
    label: 'Idea',
    autoform: {
      afFieldInput: {
        type: 'froala',
        froalaOptions: {
          charCounterCount: true,
          charCounterMax: 120,
          heightMin: 100,
          placeholderText: 'Type your idea',
          editorClass: 'title-input'
        },
        methods: [
          {
            method: 'toolbar.hide'
          },
          {
            method: 'fontSize.apply',
            parameters: ['30']
          }
        ]
      }
    }
  }
});
Posts.removeField("body");
Posts.addField({
  fieldName: 'body',
  fieldSchema: {
    type: String,
    optional: true,
    //max: 3000,
    editableBy: ["member", "admin"],
    label: 'Radionale',
    autoform: {
      afFieldInput: {
        type: 'froala',
        froalaOptions: {
          charCounterCount: true,
          heightMin: 250,
          enter: 'ENTER_P',
          editorClass: 'body-input'
        },
        methods: [
          {
            method: 'toolbar.hide'
          }
        ],
        events: {
          initialized: function (e, editor) {
            editor.html.set('<ul><li><br></li></ul>');
          },
          keydown: function (e, editor, keydownEvent) {
            if (keydownEvent.keyCode === 13) {
              e.preventDefault();
              //var newHtml = editor.html.get().replace(/p>/g, 'li>');
              $(event.target).find('p').replaceWith(function () {
                console.log(this);
                return '<li>' + $(this).contents() + '</li>';
              });
            }
          }
        }
      }
    }
  }
});
