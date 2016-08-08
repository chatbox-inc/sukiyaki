const template = {
	template: require("./index.html"),
	data: () => {
		return {
			searchText : "",
			stores               : require("../../stores"),
			files                : require("../../stores/files"),
			is_ended_constructor : false
		};
	},

	created: function() {
		let action = require("../../services/action");
		action.newFile = this.newFile;
		action.openFile = this.open;
		action.save = this.save;
		action.writeFile = this.writeFile;

		require("../../services/file_io")
		.getList(this.stores.config.root_dir)
		.then( (getFiles) => {
			getFiles.map( (file) => {
				this.stores.files.push({
					name    : file.name,
					content : file.content,
					active  : false,
					hide    : false,
					unsaved : false
				});
			});
		});

		this.newFile("newFile");
	},

	methods: {
		newFile: function(name) {
			if( this.stores.files.find((file) =>{ return file.name == "newFile"; }) === undefined){
				this.stores.files.map( (file) => {
					file.active = false;
					return file;
				});
				this.stores.files.unshift({
					name   : name,
					content: "",
					active : true,
					hide   : false
				});
				this.open("newFile");
			}
		},

		save: function() {
			let target = null;
			let action = require("../../services/action");

			this.stores.files.map( (file) => {
				if(file.active){
					file.unsaved = false;
					target = file;
				}
				return file;
			});

			if (this.stores.currentFile.name == "newFile") {
				action.showSaveDialog();
				return;
			}

			target = this.stores.files.find( (file) => {
				return file.active;
			});
			this.writeFile(this.stores.config.root_dir, this.stores.currentFile.name, target.content);
		},

		writeFile: function(dir, name, content) {

			require("../../services/file_io")
			.save(dir, name, content)
			.catch( (err) => {
				alert("エラーが発生しました。\n" + err);
			});
		},

		open: function(e) {
			let action = require("../../services/action");

			let name = e;
			if(typeof(event) == "object" ){
				name = event.target.dataset.filename;
			}

			let target = this.stores.files.map( (file) => {
				file.active = (file.name == name);
				return file;
			})
			.find( (file) => {
				return file.name == name;
			});

			let text    = target.content.replace(/\r\n|\r/g, "\n");
			let raw_content = text.split("\n");
			let title   = raw_content[0].replace("# ", "");
			let content = "";

			raw_content.shift();

			raw_content.forEach( (line) => {
				content += line + "\n";
			});

			this.stores.currentFile.name = target.name;
			this.stores.currentFile.title = title;
			this.stores.currentFile.content = content;

			if(this.is_ended_constructor === false){
				this.is_ended_constructor = true;
				return;
			}
			action.preview(
				title,
				content,
				text
			);
		},

		search: function (){
			console.log(this.searchText);
			if(!this.searchText){
				this.stores.files.map( (file) => {
					file.hide = false;
					return file;
				});
				return;
			}

			this.stores.files.map( (file) => {
				file.hide = (file.name.indexOf(this.searchText) != 0);
				return file;
			});
		}
	}
};

module.exports = template;
