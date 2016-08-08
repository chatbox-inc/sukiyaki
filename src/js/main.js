const Vue    = require("vue");
const utility = require("./utility");

require("./components");
let action = require("./services/action");

utility.init();

new Vue({
	el: "#app",

	methods: {
		hookKey: function(event) {
			if(event.keyCode !== 83) return;
			if(event.shiftKey || event.metaKey) action.save();
		}
	}
});

// require("electron-connect").client.create();
