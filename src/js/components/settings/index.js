const template = {
	template: require("./index.html"),
	data: () => {
		return {
			config: require("../../stores/config")
		}
	},

	methods: {
		selectPath: function (){
			event.preventDefault();
			var focusedWindow = browserWindow.getFocusedWindow();

			dialog.showOpenDialog(focusedWindow, {
				properties: ['openDirectory']
			}, function(directories){
				directories.forEach(function(directory){
					$(".settings-detault-path").val(directory);
				});
			});
		}
	}
};

module.exports = template;
