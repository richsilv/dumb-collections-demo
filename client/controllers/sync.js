SyncController = RouteController.extend({
  waitOn: function () {
  	return Dumb.ironRouterReady();
  },

  onRun: function () {
  	Dumb.sync();
  },

  action: function () {
  	if (this.ready()) {
    	this.render();
    } else {
    	this.render('Loading');
    }
  }
});
