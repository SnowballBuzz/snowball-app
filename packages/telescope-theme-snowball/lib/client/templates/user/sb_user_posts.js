Template.user_posts.onCreated(function(){

});

Template.user_posts.onRendered(function(){

});

Template.user_posts.helpers({
    isOwner: function(user){
      if(Meteor.userId() === user._id || Users.is.admin(Meteor.user())){
        return true;
      }
    }
});

Template.user_posts.events({

});
