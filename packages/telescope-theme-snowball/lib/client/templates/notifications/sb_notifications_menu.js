var getNotifications = function () {
  return Herald.collection.find({userId: Meteor.userId(), read: false}, {sort: {timestamp: -1}}).fetch();
};

Template.notifications_menu.onCreated(function(){

});

Template.notifications_menu.onRendered(function(){

});

Template.notifications_menu.helpers({
  menuLabel2: function () {
    var notificationsCount;
    var notifications = getNotifications();
   return '<i class="fa fa-bell-o primary"><span class="notification-count badge">' + notifications.length + '</span></i>';
  }
});

Template.notifications_menu.events({

});
