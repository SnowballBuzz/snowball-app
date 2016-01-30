//Posts.removeField();
Posts.addField({
  fieldName: 'shares',
  fieldSchema: {
    type: Number,
    optional: true,
    //autoValue: function () {
    //  return 0;
    //},
    autoform: {
      omit: true
    }
  }
});
