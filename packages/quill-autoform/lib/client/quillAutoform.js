AutoForm.addInputType('quill', {
  template: 'quill_form',
  valueOut: function() {
    //return this.find('.ql-editor').html();
    return this.html();
  }
});
