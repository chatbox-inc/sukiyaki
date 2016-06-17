const template = {
	template: require("./index.html"),
	data: () => {
		return {
			file: require("../../stores/currentFile")
		}
	}
};

module.exports = template;
