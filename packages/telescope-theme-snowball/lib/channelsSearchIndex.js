ChannelsIndex = new EasySearch.Index({
  collection: Categories,
  fields: ['name', 'description'],
  engine: new EasySearch.Minimongo({
    sort: function () {
      return ['name']
    }
  })
});
