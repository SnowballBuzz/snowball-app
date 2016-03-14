Template.post_rationale.onCreated(function () {

});

Template.post_rationale.onRendered(function () {
  Session.set('addRationale', false);
});

Template.post_rationale.helpers({
  isOwnerAndSingle: function () {
    return Users.is.owner(Meteor.user(), this) && FlowRouter.getRouteName()==='postPage';
  },
  isOwner: function(){
    return Users.is.owner(Meteor.user(), this);
  },
  publicClass: function(){
    if(!Users.is.owner(Meteor.user(), this) || FlowRouter.getRouteName()!=='postPage' || !Session.get('addRationale')){
      return 'public';
    }
  },
  addRationale: function(){
    return Session.get('addRationale');
  }
});

Template.post_rationale.events({
  'click .add-rationale': function(){
    Session.set('addRationale', true);
  },
  'click .save-rationale': function(){
    Session.set('addRationale', false);
  }
});
