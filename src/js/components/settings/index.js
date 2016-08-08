const template = {
	template: require("./index.html"),
	data: () => {
		return {
			indent_type: "",
			indent_width: "",
			root_dir: "",
			config: require("../../stores/config")
		};
	},

	created: function (){
		this.indent_type = this.config.indent_type;
		this.indent_width = this.config.indent_width;
		this.root_dir = this.config.root_dir;
	},

	methods: {
		changeIndent: function() {
			let tempLocal = JSON.parse(localStorage.config);
			tempLocal.indent_type  = this.indent_type;
			tempLocal.indent_width = this.indent_width;
			localStorage.config = JSON.stringify(tempLocal);
		},

		selectPath: function() {
			let remote = require("electron").remote;
			let dialog = remote.dialog;
			let browserWindow = remote.BrowserWindow;
			event.preventDefault();
			let focusedWindow = browserWindow.getFocusedWindow();

			dialog.showOpenDialog(focusedWindow, {
				properties: ["openDirectory"]
			}, (directories) => {
				directories.forEach((directory) =>{
					this.root_dir = directory;
					let tempLocal = JSON.parse(localStorage.config);
					tempLocal.root_dir = directory;
					localStorage.config = JSON.stringify(tempLocal);
				});
			});
		}
	}
};

module.exports = template;
