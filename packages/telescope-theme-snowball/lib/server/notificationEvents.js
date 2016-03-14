Posts.after.update(function (userId, post, fieldNames, modifier, options) {
    //console.log('updated', userId, post, fieldNames, modifier, options);
    if (_.contains(fieldNames, 'upvotes')) {
      console.log('upvoted');
      var notifiedUserIds = _.pluck(Users.find({'telescope.notifications.posts': true}, {fields: {_id: 1}}).fetch(), '_id');
      var notificationData = {post: _.pick(post, '_id', 'userId', 'title', 'url', 'upvotes')};
      notifiedUserIds = _.intersection(notifiedUserIds, post.userId);
      if (_.contains([2, 5, 10, 50, 100, 200, 500], post.upvotes)) {
        console.log('2,5,10,60,100,200, or 500');
        Herald.createNotification(notifiedUserIds, {courier: 'xPosts', data: notificationData});
      }
    }
  }
);

Herald.addCourier('xPosts', {
  media: {
    email: {
      emailRunner: function (user) {
        var properties = Posts.getNotificationProperties(this.data.post);
        var subject = "Contrats! Your post has " + this.upvotes + ' upvotes!';
        var html = Telescope.email.buildTemplate('Your post, <a href="https://app.snowball.buzz/posts/' + properties._id + '">' + properties.title + '</a>, received ' + properties.upvotes + ' upvotes! Nice idea.');
        Telescope.email.send(Users.getEmail(user), subject, html);
      }
    },
    onsite: {} //Send notifications to client, with no custom configuration
  },

  //will be a function on the collection instance, returned from find()
  message: function () {
    return "Contrats! Your post has " + this.data.post.upvotes + ' upvotes!';
  }
});
