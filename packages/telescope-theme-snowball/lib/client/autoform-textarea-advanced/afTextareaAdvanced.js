AutoForm.addInputType("textareaAdvanced", {
  template: "afTextareaAdvanced",
  valueConverters: {
    "stringArray": function (val) {
      if (typeof val === "string" && val.length > 0) {
        return linesToArray(val);
      }
      return val;
    },
    "number": AutoForm.valueConverters.stringToNumber,
    "numberArray": AutoForm.valueConverters.stringToNumberArray,
    "boolean": AutoForm.valueConverters.stringToBoolean,
    "booleanArray": function (val) {
      if (typeof val === "string" && val.length > 0) {
        var arr = linesToArray(val);
        return _.map(arr, function (item) {
          return AutoForm.valueConverters.stringToBoolean(item);
        });
      }
      return val;
    },
    "date": AutoForm.valueConverters.stringToDate,
    "dateArray": function (val) {
      if (typeof val === "string" && val.length > 0) {
        var arr = linesToArray(val);
        return _.map(arr, function (item) {
          return AutoForm.valueConverters.stringToDate(item);
        });
      }
      return val;
    }
  },
  contextAdjust: function (context) {
    if (typeof context.atts.maxlength === "undefined" && typeof context.max === "number") {
      context.atts.maxlength = context.max;
    }
    return context;
  }
});

function linesToArray(text) {
  text = text.split('\n');
  var lines = [];
  _.each(text, function (line) {
    line = $.trim(line);
    if (line.length) {
      lines.push(line);
    }
  });
  return lines;
}

Template.afTextareaAdvanced.onCreated(function () {
});

Template.afTextareaAdvanced.onRendered(function () {
  // console.log(this, Template.currentData());
  if (Template.currentData().atts.autoSize) {
    var textarea = $('#' + Template.currentData().atts.id)[0];
    //console.log(textarea, textarea.scrollHeight);
    //$(textarea).css({height: 'auto'});
    //$(textarea).height(textarea.scrollHeight);
    $(textarea).textareaAutoSize();
  }
});

Template.afTextareaAdvanced.helpers({
  charsUsed: function () {
    var data = Template.currentData();
    return data.max - Session.get('postCharsUsed') || data.max;
  }
});

Template.afTextareaAdvanced.events({
  'keyup textarea': function (e) {
    //console.log(e);
    var data = Template.currentData();
    if (data.atts.countChars) {
      Session.set('postCharsUsed', e.target.textLength);
    }
    if (data.atts.submitOnEnter && e.which == 13) {
      e.preventDefault();
      $('.afTextareaAdvanced').parent('form').submit();
    }
  }
});
