const template = {
	template: require("./index.html"),
	data: () => {
		return {
			"stores" : require("../../stores/"),
			"name"   : ""
		}
	},

	created: function() {
		var action = require("../../services/action");
		action.showSaveDialog = this.show;
		action.hideSaveDialog = this.hide;
		this.hide();
	},

	methods: {
		show: function() {
			this.stores.saveDialog = "show";
		},

		hide: function() {
			this.stores.saveDialog = "hide";
		},

		saveCheck: function(event) {
			var action = require("../../services/action");
			var path = require("path");

			if(event.keyCode == 13){
				if(this.name.indexOf(".md") == -1) this.name += ".md";
				var target;

				this.stores.files.map( (file) => {
					if(file.active){
						target = file;
						file.name = this.name
					}
					return file;
				});
				action.writeFile(this.stores.config.root_dir, this.name, target.content);
				this.stores.currentFile.name = this.name;
				this.stores.saveDialog = "hide";
			}
		}
	}
};

module.exports = template;
