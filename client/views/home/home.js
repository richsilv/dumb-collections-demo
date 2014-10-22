/*****************************************************************************/
/* Home: Event Handlers and Helpers */
/*****************************************************************************/
Template.Home.events({

  'click [data-action="insert-doc"]': function() {
    Meteor.call('collection/insert', 'Dumb', 1, function(err, res) {
      if (err) console.log(err);
    });
  },

  'click [data-action="remove-doc"]': function() {
    Meteor.call('collection/remove', 'Dumb', 1, function(err, res) {
      if (err) console.log(err);
    });
  },

  'click [data-action="sync"]': function(event, template) {
    Dumb.sync({
      failCallback: function(err) {
        if (err) {
          template.storage_full.set(true);
        } else {
          template.storage_full.set(false);
        }
      }
    });
  },

  'click [data-action="clear"]': function() {
    Dumb.clear();
  }

});

Template.Home.helpers({

  'server_count': function() {
    var countObject = Counts.findOne({collection: 'Dumb'});
    return countObject && countObject.count;
  },

  'client_count': function() {
    return Dumb.find().count();
  },

  'ready': function() {
    return Dumb.ready();
  },

  'synced': function() {
    return Dumb.synced();
  },

  'storage_full': function() {
    var template = Template.instance();
    return template.storage_full.get();
  }

});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {

  this.storage_full = new ReactiveVar(false);

};

Template.Home.rendered = function () {
};

Template.Home.destroyed = function () {
};
