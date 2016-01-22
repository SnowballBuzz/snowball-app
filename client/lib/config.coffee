FlowRouter.route '/channels',
    name: 'channels',
    action: (params) ->
        BlazeLayout.render("layout", {main: "channels"})