const template = {
	template: require("./index.html"),
	data: () => {
		return {
			file: require("../../stores/currentPreview"),
			stores: require("../../stores/"),
			status: "show"
		};
	},

	created: function() {
		let action = require("../../services/action");
		action.preview = this.preview;
		action.togglePreviewArea = this.toggle;
	},

	methods: {
		preview: function(title, content) {
			let utility = require("../../utility");
			let md = utility.marked(content);
			this.stores.currentPreview.title = title;
			this.stores.currentPreview.content = md;
		},

		toggle: function() {
			this.status = (this.status == "show" ? "hide" : "show");
		}
	}
};

module.exports = template;
