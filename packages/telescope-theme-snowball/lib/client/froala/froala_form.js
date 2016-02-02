AutoForm.addInputType('froala', {
  template: 'atFroala',
  valueOut: function () {
    return this.val();
  }
});

var executeFunctionByName = function (functionName, context /*, args */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for (var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}


Template.atFroala.onCreated(function () {

});

Template.atFroala.onRendered(function () {
  //var options = _.omit(this.data.atts, ['id', 'name', 'data-schema-key']);
  //console.log('id', froalaId,'froala options', options);
  var atts = this.data.atts;
  var selector = '#' + atts.id;
  var options = _.omit(atts.froalaOptions, ['class', 'data-schema-key', 'data-type', 'id', 'name']);
  //sanitize options
  if (options.enter) {
    if (options.enter === 'ENTER_P') {
      options.enter = $.FroalaEditor.ENTER_P;
    } else if (options.enter === 'ENTER_DIV') {
      options.enter = $.FroalaEditor.ENTER_DIV;
    }
  }
  var methods = atts.methods;
  var events = atts.events; //for events
  //console.log('selector', selector);
  console.log(atts);
  $(selector).on('froalaEditor.initialized', function (e, editor) {
      //console.log('initialized', e, editor, methods);
      _.map(methods, function (method, i) {
        var parameters = methods[i].parameters;
        //execute any methods
        executeFunctionByName(methods[i].method, editor, parameters);
      });
      if (typeof atts.events != 'undefined') {
        if (typeof atts.events.initialized != 'undefined') {
          console.log('initial event running');
          atts.events.initialized(e, editor);
        }
      }
    })
    .froalaEditor(options).on('froalaEditor.keydown', function (e, editor, keydownEvent) {
    if (typeof atts.events != 'undefined') {
      if (typeof atts.events.keydown != 'undefined') {
        atts.events.keydown(e, editor, keydownEvent);
      }
    }
  });
});

Template.atFroala.helpers({
  atts: function () {
    var data = Template.currentData(); // get data reactively
    var atts = _.clone(_.omit(data.atts, 'froalaOptions', 'methods', 'events'));
    atts["data-type"] = data.schemaType.name;
    AutoForm.Utility.addClass(atts, 'froala-form');
    //atts.doLabels = ( atts.labelLeft || atts.labelRight );
    //console.log('atts', atts);
    return atts;
  }
});

Template.atFroala.events({});
