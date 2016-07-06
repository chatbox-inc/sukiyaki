const template = {
	template: require("./index.html"),
	data: () => {
		return {
			file   : require("../../stores/currentFile"),
			config : require("../../stores/config"),
			stores : require("../../stores")
		};
	},

	methods: {
		preview: function (){
			var target = null;
			var content = "# " + this.file.title + "\n" + this.file.content;

			this.stores.files.map( (file) => {
				if(file.active){
					if(content != file.content) file.unsaved = true;
					target = file;
				}
				return file;
			});

			target.content = "# " + this.file.title + "\n" + this.file.content;

			var action = require("../../services/action");
			action.preview(
				this.file.title,
				this.file.content
			);
		},

		insertTab: function (event){
			if (event.keyCode !== 9) return;
			event.preventDefault();

			let width = (this.config.indent_type == "tabs" ? 1 : +this.config.indent_width);
			let spacing = (
				this.config.indent_type == "tabs" ?
				"\t" :
				Array((+this.config.indent_width)+1).join(" ")
			);
			let element = event.target;
			let val = element.value;
			let position = element.selectionStart;

			element.value = val.substr(0, position) + spacing + val.substr(position, val.length);
			element.setSelectionRange(position + width, position + width);
		}
	}
};

module.exports = template;
