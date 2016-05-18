Template.comment_item.onCreated(function () {

});

Template.comment_item.onRendered(function () {

});

Template.comment_item.helpers({});

Template.comment_item.events({
  'click .delete-link': function (e) {
    var comment = this;
    if (confirm("Are you sure?")) {
      Meteor.call("deleteCommentById", comment._id, function (error) {
        if (error) {
          console.log(error);
          Messages.flash(error.reason, 'error');
        } else {
          Messages.flash(i18n.t('your_comment_has_been_deleted'), 'success');
        }
      });
    }
  }
});
