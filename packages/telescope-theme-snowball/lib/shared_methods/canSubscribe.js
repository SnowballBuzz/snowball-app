Meteor.methods({
  canSubscribe: function (user, channel) {
    //var entities = {};
    entities = channel.allowedEntities.toLowerCase().split(',');
    //entities.domains = [];
    //entities.emails = [];
    var userEmails = _.pluck(_.flatten(user.emails), 'address');
    userEmails = _.map(userEmails, function(email){ return email.toLowerCase()});
    var userEmailDomains = _.map(userEmails, function (email) {
      return email.match(/[^@]+$/, "");
    });
    userEmailDomains = _.flatten(userEmailDomains);
    var match = 0;
    entities.forEach(function(entity){
      //console.log(entity, _.union(userEmails, userEmailDomains));
      //console.log(entity.indexOf(_.union(userEmails,userEmailDomains)));
      if(_.union(userEmails,userEmailDomains).indexOf(entity) > -1){
        match = 1
      }
    });
    console.log(match);
    return match;
  }
});
