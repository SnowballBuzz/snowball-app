Template.categories_admin.onCreated(function () {

});

Template.categories_admin.onRendered(function () {
});

Template.categories_admin.helpers({
  editForm: function () {
    return FlowRouter.getRouteName() === 'EditChannels';
  },
  category: function(){
    console.log(FlowRouter.getRouteName() === 'EditChannels');
    if(FlowRouter.getRouteName() === 'EditChannels') {
      console.log('on EditChannels route');
      return Categories.findOne(FlowRouter.getParam('groupId'));
    }
  }
});

Template.categories_admin.events({
  //see channelsHooks.js
  'click .submitChannel': function () {
    console.log('clicked submit');
    $('#insertCategoryForm').submit();
    //goBack();
  },
  'click .cancelChannel': function () {
    goBack();
  },
  'submit #insertCategoryForm': function (e) {
    console.log('submitting');
    e.preventDefault();
    goBack();
    //Meteor.call('subscribeToChannel', )
    //return true;
  }
});
