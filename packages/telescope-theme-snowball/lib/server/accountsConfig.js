Users.after.insert(function(userId, user){
  Accounts.sendVerificationEmail(user);
});
