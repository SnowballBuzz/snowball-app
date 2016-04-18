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
      //"Example Name" <example@gmail.com>, "Example Name" <example@gmail.com>
      var people = [];
      pasted = pasted.split(',');
      pasted.forEach(function (person) {
        obj = {};
        obj.name = person.match(/".*"/g)[0].trim().slice(1, -1);
        obj.email = person.match(/<.*>/g)[0].trim().slice(1, -1);
        people.push(obj);
      });
      // console.log(people);
      Meteor.call('bulkInvite', people, groupId, subject, html);
    } else {
      Papa.parse(files[0], {
        header: true,
        complete: function (results, file) {
          people = [];
          _.each(results.data, function (person) {
            if (person.Email) {
              people.push({name: person.Name, email: person.Email});
            }
          });
          // console.log(people);
          Meteor.call('bulkInvite', people, groupId, subject, html);
        }
      });
    }
    Modal.hide('share_group');
  }
});
