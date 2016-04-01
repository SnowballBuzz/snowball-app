Template.post_submit_modal.onCreated(function(){

});

Template.post_submit_modal.onRendered(function(){
  _.delay(function(){
    $('#post_submit_modal textarea').focus()
  }, 200);
  // $('#post_submit_modal').on('shown', function () {
  // })
});

Template.post_submit_modal.helpers({

});

Template.post_submit_modal.events({

});
