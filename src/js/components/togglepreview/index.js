const $ = require("jquery");

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
		action.togglePreview = this.toggle;
	},

	methods: {
		toggle: function() {
			$(".editor-toggle-preview").children('.fa').toggleClass('fa-eye').toggleClass('fa-eye-slash');

			$('.editor-preview')
			.toggleClass('editor-preview-hide')
			.attr(
				"data-is-active",
				($(".editor-toggle-preview").attr("data-is-active") == "1") ? "0" : "1"
			);
		}
	}
};

module.exports = template;
