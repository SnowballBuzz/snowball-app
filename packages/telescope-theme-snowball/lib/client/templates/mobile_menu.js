var getNotifications = function () {
  return Herald.collection.find({userId: Meteor.userId(), read: false}, {sort: {timestamp: -1}}).fetch();
};

Template.mobile_menu.helpers({
  notificationCount: function () {
    var notifications = getNotifications();
    console.log(notifications);
    return notifications.length;
  },
  selected: function(pathName){
    return FlowRouter.getRouteName() === pathName? 'selected': '';
  }
});

Template.mobile_menu.events({
  //'click .mobile-menu-channels': function(){
  //  Session.set('customTitle', 'Channels');
  //},
  //'click .mobile-menu-post': function(){
  //  Session.set('customTitle', 'New Idea');
  //},
  //'click .mobile-menu-notifications': function(){
  //  Session.set('customTitle', 'Notifications');
  //},
  //'click .mobile-menu-profile': function(){
  //  Session.set('customTitle', 'Profile');
  //},
});
