Accounts.config({
  sendVerificationEmail: false
  // forbidClientAccountCreation: true
});
Users.after.insert(function (userId, user) {
  if (user.emails && !user.emails[0].verified) {
    Accounts.sendVerificationEmail(user);
  }
});
