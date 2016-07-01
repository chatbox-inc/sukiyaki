const template = {
	template: require("./index.html"),
	data: () => {
		return {
			file   : require("../../stores/currentFile"),
			config : require("../../stores/config")
		}
	}
};

module.exports = template;
