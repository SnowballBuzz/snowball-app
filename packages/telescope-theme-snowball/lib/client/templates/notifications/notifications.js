Template.notifications.helpers({
  notifications: function () {
    var notifications = Herald.collection.find({
      userId: Meteor.userId(),
      read: false
    }, {sort: {timestamp: -1}}).map(function (notification) {
      var post = notification.data.post;
      var comment = notification.data.comment;
      switch (notification.courier) {
        case 'newPost':
          notification.message = '<a href="/users/' + post.userId + '">' + post.author + '</a> has created a new post: <a href="/posts/' + post._id + '">' + post.title + '</a>';
          notification.mainUserId = post.userId;
          break;
        case 'newPendingPost':
          notification.message = '<a href="/users/' + post.userId + '">' + post.author + '</a> has a new post pending approval: <a href="/posts/' + post._id + '">' + post.title + '</a>';
          notification.mainUserId = post.userId;
          break;
        case 'postApproved':
          notification.message = 'Your post <a href"/posts/' + post._id + '">"' + post.title + '"</a> has been approved';
          notification.mainUserId = notification.userId;
          break;
        case 'newComment':
          notification.message = '<a href="/users/' + comment.userId + '">' + comment.author + '</a> left a new comment on your post <a href="/posts/' + post._id + '">"' + post.title + '"</a>';
          notification.mainUserId = comment.userId;
          break;
        case 'newReply':
          notification.message = '<a href="/users/' + comment.userId + '">' + comment.author + '</a> replied to your comment on <a href="/posts/' + post._id + '">"' + post.title + '"</a>';
          notification.mainUserId = comment.userId;
          break;
        case 'newCommentSubscribed':
          notification.message = '<a href="/users/' + comment.userId + '">' + comment.author + '</a> left a new comment on <a href="/posts/' + post._id + '">"' + post.title + '"</a>';
          notification.mainUserId = comment.userId;
          break;
      }
      //notification.message = notificationMessage[notification.courier](notification.data.post, notification.data.comment);
      return notification;
    });
    console.log(notifications);
    return notifications;
  }
});
