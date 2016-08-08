const template = {
	template: require("./index.html"),
	methods: {
		newFile: function() {
			let action = require("../../services/action");
			action.newFile("newFile");
		},

		toggleFileList: function() {
			let $ = require("jquery");
			if($(".button-settings").hasClass("active")){
				$(".button-file-list").addClass("active");
				$(".button-settings").removeClass("active");
				$(".settings").toggleClass("settings-is-hidden");
				return;
			}
			$(".button-file-list").toggleClass("active");
			$(".button-file-list .fa").toggleClass("fa-folder-open-o fa-folder-o");
			$(".filetree").toggle();
			$(".main-wrap").toggleClass("is-full");
		},

		toggleSettings: function() {
			let $ = require("jquery");
			$(".settings").toggleClass("settings-is-hidden");
			$(".button-file-list").removeClass("active");
			$(".button-settings").toggleClass("active");
		}
	}
};

module.exports = template;
