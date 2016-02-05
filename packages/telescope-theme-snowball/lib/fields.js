//Channels
Categories.removeField(['order', 'slug', 'image', 'parentId']);
Posts.removeField(['categories', 'thumbnailUrl']);
Posts.addField(
  {
    fieldName: 'categories',
    fieldSchema: {
      type: [String],
      optional: false,
      editableBy: ["member", "admin"],
      autoform: {
        afFieldInput: {
          type: "selectize",
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
  }
);


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
    autoform: {
      afFieldInput: {
        type: 'froala',
        froalaOptions: {
          charCounterCount: true,
          charCounterMax: 120,
          heightMin: 100,
          placeholderText: 'What if...',
          editorClass: 'title-input'
        },
        methods: [
          {
            method: 'toolbar.hide'
          },
          {
            method: 'fontSize.apply',
            parameters: ['40']
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
    autoform: {
      afFieldInput: {
        type: 'froala',
        froalaOptions: {
          charCounterCount: true,
          heightMin: 300,
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
