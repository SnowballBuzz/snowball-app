var getNotifications = function () {
  return Herald.collection.find({userId: Meteor.userId(), read: false}, {sort: {timestamp: -1}}).fetch();
};

Template.mobile_menu.helpers({
  notSubdomain: function(){
    return Meteor.settings.public.subdomain;
  },
  notificationCount: function () {
    var notifications = getNotifications();
    //console.log(notifications);
    return notifications.length;
  },
  selected: function (pathName, attribute) {
    if(pathName === 'userProfile'){
    return FlowRouter.getRouteName() === pathName && FlowRouter.getParam('_idOrSlug') === attribute? 'selected' : '';
    } else {
      return FlowRouter.getRouteName() === pathName ? 'selected' : '';
    }
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
