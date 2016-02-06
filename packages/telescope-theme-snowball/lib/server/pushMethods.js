Meteor.methods({
  pushNotification: function (message, user) {
    // Push.debug = true; // Add verbosity
    Push.send({
      from: 'push',
      title: 'Hello',
      text: message,
      badge: 1, //optional, use it to set badge count of the receiver when the app is in background.
      query: {
        // Ex. send to a specific user if using accounts:
        userId: user
      } // Query the appCollection
      // token: appId or token eg. "{ apn: token }"
      // tokens: array of appId's or tokens
      // payload: user data
      // delayUntil: Date
    });
  }
});
