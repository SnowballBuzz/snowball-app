goBack = function (x = 0) {
  console.log('going back');
  var number = Session.get('pathHistory').length - (1 + x);
  var pathHistory = Session.get('pathHistory').slice(0, number);
  var lastPath = pathHistory[pathHistory.length - 1];
  FlowRouter.go(lastPath);
  Session.set('pathHistory', pathHistory);
}
