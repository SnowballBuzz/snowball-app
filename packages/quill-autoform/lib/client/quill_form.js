var random = Random.id();

Template.quill_form.onCreated(function () {
  //this.value = new ReactiveVar(this.data.value);
});

Template.quill_form.onRendered(function () {
  var options = this.data.atts.options || {theme: 'snow'};
  var editor = '#quill-editor-' + random;
  var toolbar = '#quill-toolbar-' + random;
  console.log('toolbar/editor: ',toolbar, editor);
  var quill = new Quill(editor, options);
  quill.addModule('toolbar', {container: toolbar});
  //console.log(this.data.atts);
  //$('#quill-editor' + random + ' .ql-editor').attr({
  //  'name': this.data.atts.name,
  //  'id': this.data.atts.id,
  //  'data-schema-key': this.data.atts['data-schema-key']
  //});
});

Template.quill_form.helpers({
  random: function(){return random;}
});

Template.quill_form.events({});
