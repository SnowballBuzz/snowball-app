Invites = new Mongo.Collection('invites');

Invites.schema = new SimpleSchema({
  /**
   ID
   */
  _id: {
    type: String,
    optional: true
  },
  /**
   Timetstamp of post creation
   */
  createdAt: {
    type: Date,
    optional: true
  },
  /**
   Email
   */
  url: {
    type: String,
    optional: true,
    editableBy: ["admin"],
  },
  /**
   Channel _id
   */
  channelId: {
    type: String,
    optional: false,
    max: 500,
    editableBy: ["admin"],
  }
});

/**
 * Attach schema to Posts collection
 */
Invites.attachSchema(Invites.schema);

Invites.allow({
  update: _.partial(Telescope.allowCheck, Invites),
  remove: _.partial(Telescope.allowCheck, Invites)
});
