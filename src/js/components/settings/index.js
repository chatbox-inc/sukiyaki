const template = {
	template: require("./index.html"),
	data: () => {
		return {
			indent_type: "",
			indent_width: "",
			root_dir: "",
			config: require("../../stores/config")
		}
	},

	created: function (){
		this.indent_type = this.config.indent_type;
		this.indent_width = this.config.indent_width;
		this.root_dir = this.config.root_dir;
		console.log(this.indent_width);
	},

	methods: {
		changeIndent: function() {
			var tempLocal = JSON.parse(localStorage.config);
			tempLocal.indent_type  = this.indent_type;
			tempLocal.indent_width = this.indent_width;
			localStorage.config = JSON.stringify(tempLocal);
		},

		selectPath: function() {
			var remote = require('electron').remote;
			var dialog = remote.dialog;
			var browserWindow = remote.BrowserWindow;
			event.preventDefault();
			var focusedWindow = browserWindow.getFocusedWindow();

			dialog.showOpenDialog(focusedWindow, {
				properties: ['openDirectory']
			}, (directories) => {
				directories.forEach((directory) =>{
					this.root_dir = directory;
					var tempLocal = JSON.parse(localStorage.config);
					tempLocal.root_dir = directory;
					localStorage.config = JSON.stringify(tempLocal);
				});
			});
		}
	}
};

module.exports = template;
