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
  'submit #privateChannelEmail': function(e,t){
    e.preventDefault();
    var email = e.target.email.value;
    Modal.hide('private_channel_modal');
    Meteor.call('addAndVerifyEmail', Meteor.user(), email);
  },
  'click .resendVerification': function(e,t){
    Meteor.call('verifyUnverifiedAccounts', function(){
      Modal.hide('private_channel_modal');
      alert('Success! We sent you a new verification link.');
    });
  }
});
