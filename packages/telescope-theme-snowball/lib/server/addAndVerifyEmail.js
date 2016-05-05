Meteor.methods({
  addAndVerifyEmail: function (user, email) {
    //check(email, 'String');
    //logged in via oAuth, no email set up
    var emails;
    if (typeof user.emails === 'undefined') {
      emails = [];
      emails.push({'address': email, 'verified': false});
      Users.update(user._id, {$set: {'emails': emails}});
    } else {
      // emails = user.emails;
      Users.update(user._id, {
        $addToSet: {
          'emails': {
            'address': email,
            'verified': false
          }
        }
      });
    }
    Accounts.sendVerificationEmail(user._id, email);
  }
});
