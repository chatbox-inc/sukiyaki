const fs     = require('fs');
const $      = require('jquery');
const Vue    = require('vue');
const utility = require("./utility");
const remote = require('electron').remote;
const dialog = remote.dialog;
const browserWindow = remote.BrowserWindow;
const path = require("path");

require("./components");
var stores = require("./stores");
var action = require("./services/action");

utility.init();

var app = new Vue({
	el: "#app",

	methods: {
		hookKey: function(event) {
			if(event.keyCode !== 83) return;
			if(event.shiftKey || event.metaKey) action.save();
		}
	}
});

require('electron-connect').client.create();
