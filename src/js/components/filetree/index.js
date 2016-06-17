const template = {
	template: require("./index.html"),
	data: () => {
		return {
			files: require("../../stores/files")
		}
	}
};

module.exports = template;
