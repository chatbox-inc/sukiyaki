const template = {
	template: require("./index.html"),
	data: () => {
		return {
			file: require("../../stores/currentPreview"),
			stores: require("../../stores/")
		}
	},

	created: function() {
		var action = require("../../services/action");
		action.preview = this.preview;
	},

	methods: {
		preview: function(title, content) {
			var utility = require("../../utility");
			var md = utility.marked(content);
			this.stores.currentPreview.title = title;
			this.stores.currentPreview.content = md;
		}
	}
};

module.exports = template;
