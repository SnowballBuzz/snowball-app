Template.submit_button.onCreated(function(){

});

Template.submit_button.onRendered(function(){

});

Template.submit_button.helpers({

});

Template.submit_button.events({
  'click .submit-btn': function(e){
    e.preventDefault();
    $('html,body').animate({scrollTop: 0});
    $('#post_submit_quick textarea').focus();
  }
});
