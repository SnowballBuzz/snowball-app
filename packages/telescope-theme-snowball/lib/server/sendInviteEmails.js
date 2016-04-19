Meteor.methods({
  bulkInvite: function (people, groupId, subject, html) {
    //emails needs to be structured like this: [{email: example, name: example}, {email: example2, name: example2}]
    people = _.without(people, '');
    console.log(people);
    var group = Categories.findOne(groupId);
    var user = Meteor.user();
    var groupLink = Settings.get('siteUrl', Meteor.absoluteUrl()).replace(/\/+$/, "") + FlowRouter.path('Channel', {groupId: groupId});
    subject = subject.replace('{group}', group.name).replace('{sender_name}', user.telescope.displayName);
    html = html.replace('{group}', '<a href="' + groupLink + '">' + group.name + '</a>').replace('{sender_name}', user.telescope.displayName);
    people.forEach(function (person) {
      var content = html;
      if (person.name) {
        person.combinedEmail = person.name + ' <' + person.email + '>';
      } else {
        person.combinedEmail = person.email;
      }
      // console.log(person, person.email, person.name, person.combinedEmail);
      var user = Users.findOne({'telescope.email': person.email});
      var newUser = typeof user === 'undefined';
      if (newUser) {
        //only add invites for new users
        var invite = Invites.findOne({invitedUserEmail: person.email});
        if (typeof invite === 'undefined') {
          invite = Invites.insert({
            invitedUserEmail: person.email,
            groupId: groupId,
            invitingUserId: Meteor.userId()
          });
          invite = Invites.findOne(invite);
        }
      }
      var url = newUser ? Settings.get('siteUrl', Meteor.absoluteUrl()).replace(/\/+$/, "") +
      FlowRouter.path('signUp', {}, {
        email: person.email,
        inviteId: invite._id
      }) : Settings.get('siteUrl', Meteor.absoluteUrl()).replace(/\/+$/, "") + FlowRouter.path('Channel', {id: groupId});
      var link = '<a href="' + url + '">Sign in to join the discussion</a>';
      content = content.replace('{recipient_name}', person.name).replace('{link}', link);
      subject = subject.replace('{recipient_name', person.name);
      content = Telescope.email.buildTemplate(content);
      // console.log(html, subject, content);
      Meteor.setTimeout(function () {
        Telescope.email.send(person.combinedEmail, subject, content);
      }, 1);
    });
    var cat = Categories.findOne(groupId);
    Categories.update({_id: groupId}, {$set: {allowedEmails: (cat.allowedEmails + '\n' + _.pluck(people, 'email').join('\n'))}});
  }
});
