Template.title.helpers({
  title: function () {
    console.log('on ', FlowRouter.getRouteName());
    return FlowRouter.getRouteName();
  }
});

Template.title.events({});
