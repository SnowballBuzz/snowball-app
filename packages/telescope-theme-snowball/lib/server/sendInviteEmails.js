Meteor.methods({
  bulkInvite: function (emails, groupId, subject, html) {
    emails = _.without(emails, '');
    var group = Categories.findOne(groupId);
    var link;
    var user = Meteor.user();
    subject = subject.replace('{group}', group.name);
    subject = subject.replace('{username}', user.telescope.displayName);
    html = html.replace('{username}', user.telescope.displayName);
    html = html.replace('{group}', group.name);
    _.each(emails, function (email) {
      var user = Users.findOne({'telescope.email': email});
      var emailProperties = {
        newUser: typeof user === 'undefined',
        communityName: group.name,
        actionLink: user ? Telescope.utils.getSigninUrl() : Telescope.utils.getSignupUrl(),
        invitedBy: Users.getDisplayName(Meteor.user()),
        profileUrl: Users.getProfileUrl(Meteor.user())
      };
      if (Users.findOne({'telescope.email': email})) {
        link = Settings.get('siteUrl', Meteor.absoluteUrl());
        html = html.replace('{link}', link);
        Telescope.email.send(email, subject, html);
      } else {
        //only add invites for new users
        var invite = Invites.update({invitedUserEmail: email}, {
          $set: {
            groupId: groupId,
            invitingUserId: Meteor.userId()
          }
        }, {upsert: true});
        link = Settings.get('siteUrl', Meteor.absoluteUrl()) + 'invite/' + invite._id;
        html = html.replace('{link}', link);
        Telescope.email.send(email, subject, html);
      }
    });
    var cat = Categories.findOne(groupId);
    Categories.update({_id: groupId}, {$set: {allowedEmails: (cat.allowedEmails + '\n' + emails.join('\n'))}});
  }
});
