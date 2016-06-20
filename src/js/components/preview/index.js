const template = {
	template: require("./index.html"),
	data: () => {
		return {
			file: require("../../stores/currentPreview")
		}
	}
};

module.exports = template;
