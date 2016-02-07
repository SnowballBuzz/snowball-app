Meteor.methods({
  verifyUnverifiedAccounts: function(){
    var user = Meteor.users.findOne(this.userId);
    var unverifiedEmails = _.pluck(_.where(user.emails, {verified: false}), 'address');
    console.log(unverifiedEmails);
    unverifiedEmails.forEach(function(email){
      console.log(email);
      Accounts.sendVerificationEmail(user._id, email);
    });
  }
});
