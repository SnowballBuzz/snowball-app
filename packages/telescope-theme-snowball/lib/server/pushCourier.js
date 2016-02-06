function executeFunctionByName(functionName, context /*, args */) {
  var args = [].slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for (var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}

var notifications = {
  newPost: function (post) {
    return post.author + ' has created a new post: ' + post.title;
  },
  newPendingPost: function (post) {
    return post.author + ' has a new post pending approval: ' + post.title;
  },
  postApproved: function (post) {
    return 'Your post “' + post.title + '” has been approved';
  },
  newComment: function (post) {
    return post.author + ' left a new comment on your post "' + post.title + '"';
  },
  subject: function (post) {
    return post.author + ' replied to your comment on "' + post.title + '"';
  },
  newCommentSubscribed: function (post) {
    return post.author + ' left a new comment on "' + post.title + '"';
  }
};
Meteor.startup(function () {
  Herald.collection.after.insert(function (userId, doc) {
    var post = Posts.findOne(doc.data.post._id);
    var message = notifications[doc.courier](post);
    console.log('Notification message:', message, post);
    Meteor.call('pushNotification', doc.userId, message);
  });
});
