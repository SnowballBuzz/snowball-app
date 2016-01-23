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