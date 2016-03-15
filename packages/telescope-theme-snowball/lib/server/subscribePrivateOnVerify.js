//if the user requested a channel, check if this email matches and subscribe him/her

Users.after.update(function (userId, user, fieldNames, modifier, options) {
  if (!!modifier.$set) {
    if (modifier.$set['emails.$.verified'] === true) {
      console.log('subscribePrivateOnVerify.js: verified email');
      //console.log('subscribePrivateOnVerify.js:', userId, user, fieldNames, modifier, options);
      Meteor.call('subscribePrivateOnVerify', Meteor.users.findOne(user._id));
    }
  }
});

Meteor.methods({
  subscribePrivateOnVerify: function (user) {
    //console.log('user', user);
    var requested = user.telescope.requestedChannel;
    //console.log('requested', requested, 'length', requested.length);
    if (requested.length) {
      var channel = Categories.findOne(requested);
      //console.log('Requested channel:', channel.name);
      Meteor.call('canSubscribe', user, channel, function (err, res) {
        //console.log('err', err, 'res', res);
        if (res) {
          //returned true, the user can subscribe
          Meteor.call("subscribeToChannel", channel._id, user, function (err, res) {
          });
        } else if (err) {
          throw err;
        }
      });
    }
  }
});
