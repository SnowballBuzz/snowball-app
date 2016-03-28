//Channels
Categories.removeField(['order', 'slug', 'image', 'parentId']);
Categories.addField({
  fieldName: 'isPrivate',
  fieldSchema: {
    label: 'Make this group private',
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
  fieldName: 'bulkInvite',
  label: 'Paste comma-separated emails',
  fieldSchema: {
    type: [String],
    optional: true,
    autoform: {
      type: 'tags'
    }
  }
});
Categories.addField({
  fieldName: 'bulkInviteCSV',
  label: 'Mass import via CSV',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
      type: 'file'
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
  "required categories": "Please choose the group you want to post your idea to."
});
Categories.addField({
  fieldName: 'allowedDomains',
  fieldSchema: {
    type: String,
    label: 'Allowed domains',
    optional: true,
    autoform: {
      type: "textarea",
      placeholder: ' organization1.com \n organization2.net \n etc... (one domain per line)'
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
      placeholder: ' name@example.com \n name@example.net'
    }
  }
});
Posts.addField({
  fieldName: 'notifyUpvotes',
  fieldSchema: {
    type: Number,
    optional: true,
    editableBy: ["member", "admin"],
    //todo: why dosn't the label show up?
    label: 'Notify me after this many upvotes',
    autoform: {
      afFieldInput: {
        type: 'number'
        //placeholder: 'What do you want to achieve today?',
      }
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
    label: 'Select a Group',
    autoform: {
      afFieldInput: {
        type: 'select',
        //multiple: true,
        firstOption: "Choose an audience",
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
      rows: 1,
      autoSize: true,
      countChars: true,
      submitOnEnter: true,
      afFieldInput: {
        type: 'textareaAdvanced',
        placeholder: 'What impact would you like to have today?',
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

Users.addField({
  fieldName: 'profile.inviteId',
  fieldSchema: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  }
});
AccountsTemplates.addField({
  _id: 'inviteId',
  type: 'hidden'
});

Invites.addField({
  fieldName: 'groupId',
  fieldSchema: {
    type: String,
    optional: true
  }
});
