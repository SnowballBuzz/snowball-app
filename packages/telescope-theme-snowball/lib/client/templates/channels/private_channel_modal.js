Template.private_channel_modal.onCreated(function () {

});

Template.private_channel_modal.onRendered(function () {

});

Template.private_channel_modal.helpers({
  domains: function () {
    var channel = this;
    //console.log(this);
    if (!!channel.allowedDomains) {
      return channel.allowedDomains.split('\n');
    } else {
      return ['No domains white-listed'];
    }
  }
});

Template.private_channel_modal.events({
  'submit #privateChannelEmail': function (e, t) {
    e.preventDefault();
    var email = e.target.email.value;
    var group = this;
    var groupId = group._id;
    Modal.hide('private_channel_modal');
    // console.log(e.target.email.value);
    Meteor.call('addAndVerifyEmail', Meteor.user(), email, function (err, res) {
      Meteor.call('emailCanSubscribe', email, groupId, function (err, res) {
        if (err) {
          alert('Error!');
        } else if (!res) {
          console.log(res);
          alert("Sorry, it looks like you don't have the right email address to join this channel.");
        } else if(res) {
          console.log(res);
          alert("Good news, this email address is valid to join " + group.name + "! Please check your mailbox to verify your email.");
        }
      });
    });
  },
  'click .resendVerification': function (e, t) {
    Meteor.call('verifyUnverifiedAccounts', function () {
      Modal.hide('private_channel_modal');
      alert('Success! We sent you a new verification link.');
    });
  }
});
