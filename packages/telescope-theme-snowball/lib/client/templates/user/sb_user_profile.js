Template.user_profile.onCreated(function () {
});

Template.user_profile.onRendered(function () {
  if (FlowRouter.getParam('_idOrSlug') === Meteor.user().telescope.slug || FlowRouter.getParam('_idOrSlug') === Meteor.userId()) {
    // console.log('hiding back button');
    $('.goBack').hide();
  }
});

Template.user_profile.helpers({});

Template.user_profile.events({});
