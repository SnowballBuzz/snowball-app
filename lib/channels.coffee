Users.addField({
    fieldName: "subscribedChannelsIds"
    fieldSchema: {
        type: [String]
        optional: true
        # autoform: {
        #     omit: true
        # }
        editableBy: ["member", "admin"]
        public: true
    }
})

Posts.removeField('categories')
Posts.addField({
    fieldName: 'categories',
    fieldSchema: {
        type: [String],
        optional: false,
        editableBy: ["member", "admin"],
        autoform: {
            # noselect: true,
            type: "select"
            order: 50
            options: () ->
                categories = Categories.find().map((category) ->
                    return {
                        value: category._id,
                        label: category.name
                    }
                )
                return categories;
        }
    }
})

SimpleSchema.messages({"required categories": "You must choose an audience (channel) to post your idea."})


Telescope.callbacks.add("postSubmit", (post) ->
    if post.categories.length == 0
        post.categories = null
    else
        post.categories = [post.categories[0]]
    return post
)