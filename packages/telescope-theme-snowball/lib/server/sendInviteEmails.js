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
      // console.log('email', email);
      var user = Users.findOne({'telescope.email': email});
      var emailProperties = {
        newUser: typeof user === 'undefined',
        communityName: group.name,
        actionLink: user ? Telescope.utils.getSigninUrl() : Telescope.utils.getSignupUrl(),
        invitedBy: Users.getDisplayName(Meteor.user()),
        profileUrl: Users.getProfileUrl(Meteor.user())
      };
      if (Users.findOne({'telescope.email': email})) {
        link = Settings.get('siteUrl', Meteor.absoluteUrl()).replace(/\/+$/, "") + FlowRouter.path('Channel', {id: groupId});
        html = html.replace('{link}', link);
        Meteor.setTimeout(function () {
          Telescope.email.send(email, subject, html);
        },1);
      } else {
        //only add invites for new users
        var invite = Invites.findOne({invitedUserEmail: email});
        if (typeof invite === 'undefined') {
          invite = Invites.insert({
            invitedUserEmail: email,
            groupId: groupId,
            invitingUserId: Meteor.userId()
          });
          invite = Invites.findOne(invite);
        }
        console.log(invite);
        link = Settings.get('siteUrl', Meteor.absoluteUrl()).replace(/\/+$/, "") + FlowRouter.path('signUp', {}, {
            email: email,
            inviteId: invite._id
          });
        console.log(link);
        html = html.replace('{link}', link);
        console.log(html.toString());
        Meteor.setTimeout(function () {
          Telescope.email.send(email, subject, html);
        }, 1);
      }
    });
    var cat = Categories.findOne(groupId);
    Categories.update({_id: groupId}, {$set: {allowedEmails: (cat.allowedEmails + '\n' + emails.join('\n'))}});
  }
});
