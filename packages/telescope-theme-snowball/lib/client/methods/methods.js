goBack = function (x = 0) {
  console.log('going back');
  var number = Session.get('pathHistory').length - (1 + x);
  var pathHistory = Session.get('pathHistory').slice(0, number);
  var lastPath = pathHistory[pathHistory.length - 1];
  if (Session.get('pathHistory').length) {
    FlowRouter.go(lastPath);
  } else {
    FlowRouter.go('postDefault');
  }
  Session.set('pathHistory', pathHistory);
}
