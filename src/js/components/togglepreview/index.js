const template = {
	template: require("./index.html"),
	data: () => {
		return {
			"stores" : require("../../stores/"),
			"status" : "show"
		}
	},

	created: function() {
		var action = require("../../services/action");
	},

	methods: {
		toggle: function() {
			var action = require("../../services/action");
			this.status = (this.status == "show" ? "hide" : "show");
			action.togglePreviewArea();
		}
	}
};

module.exports = template;
