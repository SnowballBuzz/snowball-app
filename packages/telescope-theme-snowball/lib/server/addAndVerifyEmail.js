Meteor.methods({
  addAndVerifyEmail: function (user, email) {
    //check(email, 'String');
    //logged in via oAuth, no email set up
    var emails;
      if (typeof user.emails === 'undefined') {
      emails = [];
    } else {
      emails = user.emails;
    }
    emails.push({'address': email, 'verified': false});
    console.log(emails);
    Users.update(user._id, {$set: {'emails': emails}});
    Accounts.sendVerificationEmail(user._id, email);
  }
});
