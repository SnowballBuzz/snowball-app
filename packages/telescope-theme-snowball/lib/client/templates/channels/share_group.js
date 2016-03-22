Template.share_group.onCreated(function () {

});

Template.share_group.onRendered(function () {
  $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
  $('#summernote').summernote();
});

Template.share_group.helpers();

Template.share_group.events({
  'submit #share_group': function (e) {
    e.preventDefault();
    var pasted = e.target.bulkInvite.value;
    var files = e.target.bulkInviteCSV.files;
    var groupId = FlowRouter.getParam('groupId');
    var group = Categories.findOne(groupId);
    var data;
    var subject = e.target.emailSubject.value;
    //variables: {username}, {category}, {link}
    // var html = e.target.emailHtml.value;
    // console.log(e);
    var html = $('#summernote').summernote('code');
    // console.log(html);
    if (pasted) {
      data = pasted.split(',');
      // console.log(data);
      Meteor.call('bulkInvite', data, groupId, subject, html);
    } else {
      Papa.parse(files[0], {
        complete: function (results, file) {
          data = [];
          _.each(results.data, function (email) {
            data.push(email[0]);
          });
          // console.log(data);
          Meteor.call('bulkInvite', data, groupId, subject, html);
        }
      });
    }
    Modal.hide('show_group');
  }
});
