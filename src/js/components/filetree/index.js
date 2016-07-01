const fs = require("fs");

const template = {
	template: require("./index.html"),
	data: () => {
		return {
			files : require("../../stores/files"),
			config: require("../../stores/config"),
			searchText: ""
		}
	},
	created: function() {
		require("../../services/file_io").getList(this.config.root_dir)
		.then( (getFiles) => {
			getFiles.map( (file) => {
				this.files.push({
					name    : file.name,
					content : file.content,
					active  : false,
					hide    : false,
					unsaved : false
				});
			});
		});
	},

	methods: {
		new: function() {
			if( stores.files.find((file) =>{ return file.name == ""; }) === undefined){
				stores.files.map( (file) => {
					file.active = false;
					return file;
				});
				stores.files.unshift({
					name   : "",
					content: "",
					active : true,
					hide   : false
				});
			}
			openFile("");
		},

		save: function() {

		},

		open: function() {

		},

		search: function (){
			if(!this.searchText){
				this.files.map( (file) => {
					file.hide = false;
					return file;
				});
				return;
			}

			this.files.map( (file) => {
				file.hide = (file.name.indexOf(this.searchText) != 0);
				return file;
			});
		}
	}
};

module.exports = template;
