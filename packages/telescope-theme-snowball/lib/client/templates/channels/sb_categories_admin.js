Template.categories_admin.onCreated(function () {

});

Template.categories_admin.onRendered(function () {
});

Template.categories_admin.helpers({
  editOrInsert: function () {
    if(FlowRouter.getRouteName() === 'EditChannels'){
      return 'update';
    } else {
      return 'insert';
    }
  },
  category: function(){
    if(FlowRouter.getRouteName() === 'EditChannels') {
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
