Template.post_submit_quick.onCreated(function () {

});

Template.post_submit_quick.onRendered(function (e) {
});

Template.post_submit_quick.helpers({
  placeholder: function () {
    if (FlowRouter.getParam('groupId') && Categories.findOne(FlowRouter.getParam('groupId')).placeholder) {
      return Categories.findOne(FlowRouter.getParam('groupId')).placeholder;
    } else {
      return 'What impact would you like to have today?';
    }
  },
  postSubmitClass: function () {
    if (Meteor.settings.public.subdomain || FlowRouter.getParam('groupId')) {
      return 'subdomain ' + Meteor.settings.public.subdomain;
    }
  },
  category: function () {
    if (FlowRouter.getQueryParam('cat')) {
      return {'categories': Categories.findOne({slug: FlowRouter.getQueryParam('cat')[0]})._id};
    } else if (FlowRouter.getParam('groupId')) {
      return {'categories': Categories.findOne(FlowRouter.getParam('groupId'))._id};
    }
  }
});

Template.post_submit_quick.events({
  'submit #post_submit_quick': function(e){
    // e.preventDefault();
    Modal.hide('post_submit_modal');
  }
});
