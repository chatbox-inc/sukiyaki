const template = {
	template: require("./index.html"),
	data: () => {
		return {
			file   : require("../../stores/currentFile"),
			config : require("../../stores/config"),
			stores : require("../../stores")
		}
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
		    var element = event.target;
		    var val = element.value;
		    var position = element.selectionStart;
			element.value = val.substr(0, position) + '\t' + val.substr(position, val.length);
		    element.setSelectionRange(position + 1, position + 1);
		}
	}
};

module.exports = template;
