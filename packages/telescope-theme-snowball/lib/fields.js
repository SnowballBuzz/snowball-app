//Channels
Categories.removeField(['order', 'slug', 'image', 'parentId']);
Categories.addField({
  fieldName: 'isPrivate',
  fieldSchema: {
    label: 'Make this private',
    defaultValue: false,
    type: String,
    autoform: {
      type: "select-radio-inline",
      options: function () {
        return [
          {label: "Public", value: false},
          {label: "Private", value: true}
        ];
      }
    }
  }
});
Categories.addField({
  //urls & domains
  fieldName: 'allowedEntities',
  fieldSchema: {
    type: String,
    label: 'Allowed email addresses or company domains (separate with commas or space):',
    optional: true,
    autoform: {
      //afFieldInput: {
      type: "text",
      //select2Options: {
      placeholder: 'john@example.com, example.com, example.net, etc...',
      //  multiple: true,
      //  tags: true,
      //  tokenSeparators: [',', ' ']
      //},
      //options: function () {
      //  return [];
      //}
      //}
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
                return '<li>' + $(this).contents() + '</li>';
              });
            }
          }
        }
      }
    }
  }
});
