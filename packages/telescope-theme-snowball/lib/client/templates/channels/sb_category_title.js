Template.category_title.onCreated(function(){

});

Template.category_title.onRendered(function(){

});

Template.category_title.helpers({
    isCategory: function(){
      return FlowRouter.getRouteName() === 'Channel';
    },
    category: function(){
      var groupId = FlowRouter.getParam('id');
      return Categories.findOne(groupId);
    }
});

Template.category_title.events({
  'click .share-group': function(e){
    Modal.show('share_group');
  }
});
