Meteor.methods({
  verifyEmail: function (inviteId, userId) {
    var invite = Invites.findOne(inviteId);
    var user = Users.findOne(userId);
    console.log(invite.invitedUserEmail, user.emails[0].address);
    if (invite.invitedUserEmail === user.emails[0].address) {
      console.log('verified email');
      Users.update(userId, {
        $set: {
          'emails.0.verified': true
        }
      });
    }
  }
});
