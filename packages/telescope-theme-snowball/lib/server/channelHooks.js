Categories.before.insert(function (userId, doc) {
  if (doc.isPrivate) {
    var userEmail = Meteor.users.findOne(userId).emails[0].address;
    if (!doc.allowedEmails) {
      doc.allowedEmails = userEmail;
    } else {
      doc.allowedEmails += ',' + userEmail;
    }
  }
});
