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
Users.addField({
  fieldName: "subscribedChannelsIds",
  fieldSchema: {
    type: [String],
    optional: true,
    editableBy: ["member", "admin"],
    "public": true,
    autoform: {
      omit: true
    }
  }
});
Users.addField({
  fieldName: "telescope.pushBadge",
  fieldSchema: {
    type: Number,
    optional: true,
    editableBy: ["member", "admin"],
    //"public": true,
    autoform: {
      omit: true
    }
  }
});
Users.addField({
  fieldName: "telescope.doNotify",
  fieldSchema: {
    type: Boolean,
    defaultValue: true,
    optional: true,
    editableBy: ["member", "admin"],
    //"public": true,
    label: 'Enable mobile push notifications',
    autoform: {
      type: "boolean-radio"
    }
  }
});

SimpleSchema.messages({
  "required categories": "You must choose an audience (channel) to post your idea."
});
Categories.addField({
  fieldName: 'allowedDomains',
  fieldSchema: {
    type: String,
    label: 'Allowed website domains (one per line):',
    optional: true,
    autoform: {
      type: "textarea",
      placeholder: 'example.com, example.net, etc...'
    }
  }
});
Categories.addField({
  fieldName: 'allowedEmails',
  fieldSchema: {
    type: String,
    label: 'Allowed email addresses (one per line):',
    optional: true,
    autoform: {
      type: "textarea",
      placeholder: 'name@example.com, name@example.net, etc...'
    }
  }
});
Categories.addField({
  //owner of channel
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
        type: 'select',
        //multiple: true,
        options: function () {
          var categories = Categories.find({_id: {$in: Meteor.user().subscribedChannelsIds}}).map(function (category) {
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
    //label: 'Idea',
    autoform: {
      afFieldInput: {
        type: 'froala',
        froalaOptions: {
          charCounterCount: true,
          charCounterMax: 120,
          heightMin: 100,
          placeholderText: 'Explain your idea succinctly',
          editorClass: 'title-input'
        },
        methods: [
          {
            method: 'toolbar.hide'
          },
          {
            method: 'fontSize.apply',
            parameters: ['24']
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
    label: 'Rationale',
    autoform: {
      afFieldInput: {
        type: 'froala',
        froalaOptions: {
          //charCounterCount: true,
          heightMin: 250,
          enter: 'ENTER_P',
          editorClass: 'body-input',
          placeholderText: 'Type your idea',
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
            //console.log('e', e, 'editor', editor, 'keydownEvent', keydownEvent, 'event', event);
            //backspace
            if (keydownEvent.keyCode === 8) {
              //console.log('backspace', keydownEvent.target.innerHTML);
              if (keydownEvent.target.innerHTML === '<ul><li><br></li></ul>') {
                keydownEvent.preventDefault();
                //editor.html.set('<ul><li><br></li></ul>');
                //$(keydownEvent.target).html('<ul><li><br></li></ul>');
                //editor.events.focus();
                console.log('prevented');
              }
            } else if (keydownEvent.keyCode === 13) {
              e.preventDefault();
              $(e.target).find('p').replaceWith(function () {
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


Users.addField({
  fieldName: 'telescope.requestedChannel',
  fieldSchema: {
    type: String,
    optional: true
  }
});
