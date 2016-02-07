Meteor.methods({
  canSubscribe: function (user, channel) {

    //If no allowed emails are set (which they should be), at least add the owner
    if(!channel.allowedEmails){
      var user = Meteor.users.findOne(channel.userId);
      Categories.update(channel._id, {$set: {allowedEmails: user.emails[0].address}});
      return false;
    }

    //get entities
    var entities = channel.allowedEmails;
    if(channel.allowedEntities){
      entities += '\n' +  channel.allowedDomains;
    }
    console.log(entities);
    entities = entities.toLowerCase().trim();
    entities = entities.split('\n');

    //get verified email(s) and domain(s) of user
    var userEmails = _.pluck(_.flatten(_.where(user.emails, {'verified': true})), 'address');
    userEmails = _.map(userEmails, function (email) {
      return email.toLowerCase().trim();
    });
    var userEmailDomains = _.map(userEmails, function (email) {
      return email.match(/[^@]+$/, "");
    });
    userEmailDomains = _.flatten(userEmailDomains);

    //Does the user qualify?
    var match = 0;
    entities.forEach(function (entity) {
      if (_.union(userEmails, userEmailDomains).indexOf(entity) > -1) {
        match = 1
      }
    });
    return match;
  }
});
