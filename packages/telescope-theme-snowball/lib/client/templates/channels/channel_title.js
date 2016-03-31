Template.channel_title.onCreated(function () {

});

Template.channel_title.onRendered(function () {

});

Template.channel_title.helpers({
  title: function () {
    var groupId = FlowRouter.getParam('groupId');
    return Categories.findOne(groupId).name;
  },
  groupId: function () {
    return FlowRouter.getParam('groupId');
  }
});

Template.channel_title.events({});
