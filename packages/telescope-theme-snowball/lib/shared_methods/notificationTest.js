Meteor.methods({
  notificationTest: function (message) {
     //Push.debug = true; // Add verbosity
    var me = Meteor.user();
    if (me.isAdmin) {
      var badgeCount = 10;
      //console.log(Users.findOne(me._id);
      Users.update(me._id, {$set: {'telescope.pushBadge': badgeCount}});
      Push.send({
        from: 'push',
        title: '!',
        text: message,
        badge: badgeCount, //optional, use it to set badge count of the receiver when the app is in background.
        query: {
          // Ex. send to a specific user if using accounts:
          userId: me._id
        } // Query the appCollection
        // token: appId or token eg. "{ apn: token }"
        // tokens: array of appId's or tokens
        // payload: user data
        // delayUntil: Date
      });
      console.log('sending message to ', me.username, ': ', message);
    }
  }
});
