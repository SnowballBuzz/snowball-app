Meteor.methods({
  pushNotification: function (userId, message, post) {
    // Push.debug = true; // Add verbosity
    var user = Users.findOne(userId);
    if (user) {
      if (user.telescope.doNotify === null) {
        Meteor.users.update({_id: user._id}, {$set: {'telescope.doNotify': true}});
      }
      if (user.telescope.doNotify) {
        var badgeCount = user.telescope.pushBadge + 1 || 1;
        Users.update(userId, {$set: {'telescope.pushBadge': badgeCount}});
        Push.send({
          from: 'push',
          title: 'Heads up from Snowball:',
          text: message,
          badge: badgeCount, //optional, use it to set badge count of the receiver when the app is in background.
          query: {
            // Ex. send to a specific user if using accounts:
            userId: userId
          }, // Query the appCollection
          // token: appId or token eg. "{ apn: token }"
          // tokens: array of appId's or tokens
           payload: {
             post: post
           },
          // delayUntil: Date
        });
      }
    }
  },
  resetBadge: function (userId) {
    Users.update(userId, {$set: {'telescope.pushBadge': 0}});
  }
});
