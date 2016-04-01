var getMenuItems = function () {
  var defaultItems = Telescope.menuItems.get("viewsMenu");

  // reject an item if the item is admin only and the current user is not an admin
  // or if views have been configured in the settings and the item is not part of them
  var viewableItems = _.reject(defaultItems, function (item) {
    return (item.adminOnly && !Users.is.admin(Meteor.user())) || (!!Settings.get('postViews') && !_.contains(Settings.get('postViews'), item.name));
  });

  viewableItems = _.map(viewableItems, function (item) {
    item.itemClass = "view-" + item.name;
    return item;
  });

  return viewableItems;
};

Template.layout.onCreated(function () {
  Tracker.autorun(function () {
    FlowRouter.watchPathChange();
    var currentContext = FlowRouter.current();
    console.log(currentContext);
    //keep track of history
    Tracker.nonreactive(function () {
      var history = Session.get('pathHistory') || [];
      if (history[history.length - 1] !== currentContext.path) {
        history.push(currentContext.path);
        Session.set('pathHistory', history);
      }
      //reset query
      Session.set('searchQuery', '');
    });
  });
});

Template.logo.helpers({
  title: function () {
    console.log('on ', FlowRouter.getRouteName());
    return FlowRouter.getRouteName();
  },
  routeIs: function (routeName) {
    return FlowRouter.getRouteName() === routeName;
  },
  menuLabel: function () {
    return i18n.t("view");
  },
  menuItems: function () {
    return getMenuItems();
  },
  customTitle: function () {
    if (Session.get('customTitle')) {
      return Session.get('customTitle');
    }
  },
  zoneLeft: function () {
    //var route = FlowRouter.current().route.path;
    switch (route) {
      case '/channels':
        return '<a><i class="icon icon-plus primary"></i></a>';
        break;
      case '/submit':
        return '<a>Cancel</a>'
        break;
      case "/users/:_idOrSlug":
        break;
      default:
        return false;
    }
  },
  zoneRight: function () {
    //var route = FlowRouter.current().route.path;
    switch (route) {
      case '/':
        return '<a><i class="icon icon-magnifier primary"></i></a>';
        break;
      case '/channels':
        return '<a><i class="icon icon-magnifier primary"></i></a>';
        break;
      case '/submit':
        return '<a>Post</a>';
        break;
      case "/users/:_idOrSlug":
        return '<a><i class="icon icon-cog"></i></a>';
        break;
      default:
        return false;
    }
  }
});

Template.sb_logo.events({});
