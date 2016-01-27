Users.addField({
  fieldName: "subscribedChannelsIds",
  fieldSchema: {
    type: [String],
    optional: true,
    editableBy: ["member", "admin"],
    "public": true
  }
});

Posts.removeField('categories');

Posts.addField({
  fieldName: 'categories',
  fieldSchema: {
    type: [String],
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      type: "select",
      order: 50,
      options: function () {
        var categories;
        categories = Categories.find().map(function (category) {
          return {
            value: category._id,
            label: category.name
          };
        });
        return categories;
      }
    }
  }
});

SimpleSchema.messages({
  "required categories": "You must choose an audience (channel) to post your idea."
});

Telescope.callbacks.add("postSubmit", function (post) {
  if (post.categories.length === 0) {
    post.categories = null;
  } else {
    post.categories = [post.categories[0]];
  }
  return post;
});

Telescope.callbacks.add("postsParameters", function (parameters, terms) {
  var user;
  user = Meteor.users.find(terms.userId).fetch()[0];
  if (((user != null ? user.subscribedChannelsIds : void 0) != null) === true) {
    parameters.find = {
      categories: {
        $in: user.subscribedChannelsIds
      }
    };
  } else {
    parameters.find = {
      categories: "only_public"
    };
  }
  return parameters;
});
