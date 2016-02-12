Categories.before.insert(function (userId, doc) {
  if (doc.isPrivate) {
    var userEmail = Meteor.users.findOne(userId).emails[0].address;
    console.log('adding default email address');
    if (!doc.allowedEmails) {
      doc.allowedEmails = userEmail;
    } else {
      doc.allowedEmails += '\n' + userEmail;
    }
  }
});

if(Meteor.isClient){
  AutoForm.hooks({
    'submitPostForm': {
      before: {
        method: function (post) {
          if (typeof post.categories === 'string') {
            post.categories = [post.categories];
          }
          return post;
        }
      }
    }
  });
}
