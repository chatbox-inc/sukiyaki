const template = {
	template: require("./index.html"),
	data: () => {
		return {
			config: require("../../stores/config")
		}
	}
};

module.exports = template;
