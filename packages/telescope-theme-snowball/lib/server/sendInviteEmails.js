Meteor.methods({
  bulkInvite: function (emails, groupId) {
    emails = _.without(emails, '');
    var group = Categories.findOne(groupId);
    var subject = "You've been invited to the \"" + group.name + "\" group";
    _.each(emails,function(email){
        var user = Users.findOne({'telescope.email': email});
        var emailProperties = {
          newUser: typeof user === 'undefined',
          communityName: group.name,
          actionLink: user ? Telescope.utils.getSigninUrl() : Telescope.utils.getSignupUrl(),
          invitedBy: Users.getDisplayName(Meteor.user()),
          profileUrl: Users.getProfileUrl(Meteor.user())
        };
        if (Users.findOne({'telescope.email': email})) {
          Telescope.email.buildAndSend(email, subject, 'emailInvite', emailProperties);
        } else {
          //only add invites for new users
          Telescope.email.buildAndSend(email, subject, 'emailInvite', emailProperties);
          Invites.update({invitedUserEmail: email}, {$set: {
                groupId: groupId,
                invitingUserId: Meteor.userId()
              }
            }, {upsert: true});
        }
    });
    var cat = Categories.findOne(groupId);
    Categories.update({_id: groupId}, {$set: {allowedEmails: (cat.allowedEmails + '\n' + emails.join('\n'))}});
  }
});
