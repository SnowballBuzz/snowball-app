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
      afFieldInput: {
        type: "boolean-select"
      }
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
    max: 120,
    editableBy: ["member", "admin"],
    label: 'Idea',
    autoform: {
      rows: 2,
      autoSize: true,
      countChars: true,
      submitOnEnter: true,
      afFieldInput: {
        type: 'textareaAdvanced',
        placeholder: 'What do you want to achieve',
      }
    }
  }
});
Posts.removeField("body");
Posts.addField([
  {
    fieldName: 'rationale',
    fieldSchema: {
      type: Array,
      optional: true,
      //max: 3000,
      editableBy: ["member", "admin"],
      label: 'Rationale',
      autoform: {
        //type: '',
      }
    }
  },
  {
    fieldName: 'rationale.$',
    fieldSchema: {
      type: String,
      //optional: true,
      editableBy: ["member", "admin"],
      //autoform: {
      //  type: "text"
      //}
    }
  }
]);


Users.addField({
  fieldName: 'telescope.requestedChannel',
  fieldSchema: {
    type: String,
    optional: true
  }
});
