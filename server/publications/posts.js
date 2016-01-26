Meteor.publishComposite('postsList', function(terms) {
  return {
    find: function() {
      return Meteor.users.find({ _id: this.userId }, { limit: 1});
    },
    children: [
      {
        find: function (user) {
          terms.userId = user._id; // add userId to terms
          if (Users.can.viewById(user._id)){
            var parameters = Posts.parameters.get(terms),
                posts = Posts.find(parameters.find, parameters.options);
            return posts;
          }
          return [];
        }
      }
    ]
  };
});
