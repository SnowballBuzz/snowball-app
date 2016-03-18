function executeFunctionByName(functionName, context /*, args */) {
  var args = [].slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for (var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}
// Anonymized newPost function below
var notifications = {
  newPost: function (post) {
    return 'Someone has posted a new idea: ' + post.title;
  },
  newPendingPost: function (post) {
    return post.author + ' has a new post pending approval: ' + post.title;
  },
  postApproved: function (post) {
    return 'Your post “' + post.title + '” has been approved';
  },
  newComment: function (post, comment) {
    return comment.author + ' left a new comment on your post "' + post.title + '"';
  },
  newReply: function (post, comment) {
    return comment.author + ' replied to your comment on "' + post.title + '"';
  },
  newCommentSubscribed: function (post, comment) {
    return comment.author + ' left a new comment on "' + post.title + '"';
  },
  xPosts: function(post){
    return "Your idea received " + post.upvotes + ' upvotes: ' + post.title;
  }
};
Meteor.startup(function () {
  Herald.collection.after.insert(function (userId, doc) {
    //console.log(doc, userId);
    var post = Posts.findOne(doc.data.post._id);
    var comment = doc.data.comment? Comments.findOne(doc.data.comment._id): '';
    var message = notifications[doc.courier](post, comment);
    console.log('Notification message:', message);
    Meteor.call('pushNotification', doc.userId, message, doc.data.post);
  });
});
