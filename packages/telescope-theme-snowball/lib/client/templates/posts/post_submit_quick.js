Template.post_submit_quick.onCreated(function () {

});

Template.post_submit_quick.onRendered(function (e) {
});

Template.post_submit_quick.helpers({
  category: function () {
    if (FlowRouter.getQueryParam('cat')) {
      return {'categories': Categories.findOne({slug: FlowRouter.getQueryParam('cat')[0]})._id};
    } else if(FlowRouter.getParam('groupId')){
      return {'categories': Categories.findOne(FlowRouter.getParam('groupId'))._id};
    }
  }
});

Template.post_submit_quick.events({
  // 'submit #post_submit_quick': function(e){
  //   e.preventDefault();
  // }
});
