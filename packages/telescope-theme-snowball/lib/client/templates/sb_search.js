var searchId = 'search-' + Random.id()

Template.search.onCreated(function(){

});

Template.search.onRendered(function(){

});

Template.search.helpers({
  id: function(){
    return searchId;
  }
});

Template.search.events({
  'click .closeSearch': function(e){
    e.preventDefault();
    //console.log(this, e);
    $(e.target).parent().toggleClass('hidden');
    $(e.target).parent().parent().slideToggle(300);
  }
});
