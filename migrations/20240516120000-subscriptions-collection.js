module.exports = {
  async up(db) {
    await db.createCollection('subscriptions');
  },

  async down(db) {
    await db.dropCollection('subscriptions').drop();
  },
};
