const $ = require("jquery");
const template = {
	template: require("./index.html"),
	data: () => {
		return require("../../stores/savedialog")
	},

	methods: {
		hide: function (){
			this.status = "hide";
		}
	}
};

module.exports = template;
