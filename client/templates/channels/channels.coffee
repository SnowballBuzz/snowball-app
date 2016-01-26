IsSubscribedTo = (channelId) ->
    if Meteor.user().subscribedChannelsIds? == false
        return false
    else
        return $.inArray(channelId, Meteor.user().subscribedChannelsIds) != -1

Template.channels.helpers({
    ChannelsToDisplay: () ->
        return Categories.find().fetch()

    IsSubscribedTo: IsSubscribedTo

    GetClassForIsSubscribedTo: (channelId) ->
        return if IsSubscribedTo(channelId) then "subscribed" else "not-subscribed"
})

Template.channels.events({
    'click .not-subscribed button': (e) ->
        channelId = $(e.target).attr("channel-id")
        if IsSubscribedTo(channelId) == false
            Meteor.call("subscribeToChannel", channelId)

    'click .subscribed button': (e) ->
        channelId = $(e.target).attr("channel-id")
        if IsSubscribedTo(channelId) == true
            Meteor.call("unsubscribeToChannel", channelId)
})