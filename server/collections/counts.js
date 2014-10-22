/*
 * Add query methods like this:
 *  Counts.findPublic = function () {
 *    return Counts.find({is_public: true});
 *  }
 */

Meteor.startup(function() {

  Counts.upsert({collection: 'Dumb'}, {collection: 'Dumb', count: 0});

  Dumb.find().observeChanges({
    added: function (id, fields) {
      Counts.update({collection: 'Dumb'}, {$set: {count: Dumb.find().count()}});
    },
    removed: function (id) {
      Counts.update({collection: 'Dumb'}, {$set: {count: Dumb.find().count()}});
    }
  });

});

Counts.deny({
  insert: function (userId, doc) {
    return true;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },

  remove: function (userId, doc) {
    return true;
  }
});
