Meteor.methods({
    "subscribeToChannel": (channelId) ->
        newSubscribedChannelsIds = Meteor.user().subscribedChannelsIds
        if newSubscribedChannelsIds? == false
            newSubscribedChannelsIds = [channelId]
        else
            if _.contains(newSubscribedChannelsIds, channelId) == true
                return "User already subscribed to this channel !"
            newSubscribedChannelsIds.push(channelId)
        Users.update(Meteor.userId(), {$set: {subscribedChannelsIds: newSubscribedChannelsIds}})

    "unsubscribeToChannel": (channelId) ->
        newSubscribedChannelsIds = Meteor.user().subscribedChannelsIds
        if newSubscribedChannelsIds? == false or _.contains(newSubscribedChannelsIds, channelId) == false
            return "User was not subscribed"
        else
            index = newSubscribedChannelsIds.indexOf(channelId)
            newSubscribedChannelsIds.splice(index, 1)
        Users.update(Meteor.userId(), {$set: {subscribedChannelsIds: newSubscribedChannelsIds}})
})