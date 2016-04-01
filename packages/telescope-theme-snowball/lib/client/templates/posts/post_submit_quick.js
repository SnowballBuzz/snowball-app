Template.post_submit_quick.onCreated(function () {

});

Template.post_submit_quick.onRendered(function (e) {
});

Template.post_submit_quick.helpers({
  hasGroup: function () {
    return FlowRouter.getQueryParam('cat').length;
  },
  prefillGroup: function () {
    if (FlowRouter.getQueryParam('cat')) {
      //console.log([Categories.findOne({slug: FlowRouter.getQueryParam('cat')[0]})._id]);
      return Categories.findOne({slug: FlowRouter.getQueryParam('cat')[0]})._id;
    }
  },
  category: function () {
    if (FlowRouter.getQueryParam('cat')) {
      return Categories.findOne({slug: FlowRouter.getQueryParam('cat')[0]});
    }
  }
});

Template.post_submit_quick.events({});
