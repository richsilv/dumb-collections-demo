/*****************************************************************************/
/* Collection Methods */
/*****************************************************************************/

Meteor.methods({
	'collection/insert': function(collection, number) {
		var thisCollection = global[collection],
			i;
		if (!thisCollection) return false;
		for (i = number; i > 0; i--)
			thisCollection.insert({_id: thisCollection._makeNewID()});
		return number;
	},

	'collection/remove': function(collection, number) {
		var thisCollection = global[collection],
			count,
			id,
			i;
		if (!thisCollection) return false;
		count = thisCollection.find().count();
		for (i = number; i > 0 && count >= 0; i--) {
			id = thisCollection.findOne({}, {skip: parseInt(Math.random() * count, 10)});
			thisCollection.remove(id);
			count--;
		}
	}
});
