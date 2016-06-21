const $ = require("jquery");
const template = {
	template: require("./index.html"),
	data: () => {
		return require("../../stores/savedialog")
	}
};

module.exports = template;
