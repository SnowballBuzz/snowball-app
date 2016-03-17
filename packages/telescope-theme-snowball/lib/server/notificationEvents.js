Posts.after.update(function (userId, post, fieldNames, modifier, options) {
    //console.log('updated', userId, post, fieldNames, modifier, options);
    if (_.contains(fieldNames, 'upvotes')) {
      var notifiedUserIds = _.pluck(Users.find({'telescope.doNotify': true}, {fields: {_id: 1}}).fetch(), '_id');
      notifiedUserIds = _.intersection(notifiedUserIds, [post.userId]);
      var groupUserIds = _.intersection(Users.find({}));
      var notificationData = {post: _.pick(post, '_id', 'userId', 'title', 'url', 'upvotes')};
      var group = Categories.findOne(post.categories[0]);

      if (_.contains([2, 5, 10, 50, 100, 200, 500], post.upvotes) && !group.isPrivate) {
        console.log('2,5,10,50,100,200, or 500', notifiedUserIds, notificationData);
        Herald.createNotification(notifiedUserIds, {courier: 'xPosts', data: notificationData});
      } else if (post.upvotes === 5 && group.isPrivate) {
        console.log('5 private upvotes', notifiedUserIds, notificationData);
        Herald.createNotification(notifiedUserIds, {courier: 'xPosts', data: notificationData});
      }
    }
  }
);

Posts.after.insert(function (userId, post, fieldNames) {
  // var user = Users.findOne(post.userId);
  Users.update(userId, {$inc: {'telescope.karma': 2}});
});
