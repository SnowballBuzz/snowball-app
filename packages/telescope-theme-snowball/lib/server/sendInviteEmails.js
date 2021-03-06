Meteor.methods({
  bulkInvite: function (people, groupId, subject, html) {
    //emails needs to be structured like this: [{email: example, name: example}, {email: example2, name: example2}]
    people = _.without(people, '');
    console.log(people);
    var group = Categories.findOne(groupId);
    var user = Meteor.user();
    subject = subject.replace('{group}', group.name).replace('{sender_name}', user.telescope.displayName);
    var sendEmails = function (userId, newUser, person, groupId, subject, content) {
      //userId, newUser, person, groupId, subject, content
      var loginToken = LoginLinks.generateAccessToken(userId);
      var groupLink = Settings.get('siteUrl', Meteor.absoluteUrl()).replace(/\/+$/, "") + FlowRouter.path('Channel', {groupId: groupId}, {token: loginToken});
      var url = newUser ?
        Settings.get('siteUrl', Meteor.absoluteUrl()).replace(/\/+$/, "") +
        FlowRouter.path('Channel', {groupId: groupId}, {email: person.email, token: loginToken})
        : groupLink;
      // console.log(url);
      var link = '<a href="' + url + '">Sign in to join the discussion</a>';
      content = content.replace('{recipient_name}', person.name).replace('{link}', link);
      content = content.replace('{group}', '<a href="' + groupLink + '">' + group.name + '</a>').replace('{sender_name}', user.telescope.displayName);
      subject = subject.replace('{recipient_name', person.name);
      content = Telescope.email.buildTemplate(content);
      // console.log(html, subject, content);
      Meteor.setTimeout(function () {
        Telescope.email.send(person.combinedEmail, subject, content);
      }, 1);
    }
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
        console.log('new user, creating username');
        Meteor.call('generateUniqueUsername', person.name, function (err, username) {
          console.log('username: ', username);
          var userId = Accounts.createUser({username: username, email: person.email, profile: {name: person.name}});
          user = Users.findOne(userId);
          Users.update({_id: userId}, {$set: {subscribedChannelsIds: [groupId]}});
          sendEmails (userId, newUser, person, groupId, subject, content);
          //only add invites for new users
          // var invite = Invites.findOne({invitedUserEmail: person.email});
          // if (typeof invite === 'undefined') {
          //   invite = Invites.insert({
          //     invitedUserEmail: person.email,
          //     groupId: groupId,
          //     invitingUserId: Meteor.userId()
          //   });
          //   invite = Invites.findOne(invite);
          // }
        });
      } else {
        var userId = user._id;
        sendEmails (userId, newUser, person, groupId, subject, content);
      }
    });
    var cat = Categories.findOne(groupId);
    Categories.update({_id: groupId}, {$set: {allowedEmails: (cat.allowedEmails + '\n' + _.pluck(people, 'email').join('\n'))}});
  }
});
