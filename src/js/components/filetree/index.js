const fs = require("fs");

const template = {
	template: require("./index.html"),
	data: () => {
		return {
			files : require("../../stores/files"),
			config: require("../../stores/config")
		}
	},
	created: function() {
		fs.readdir(require("path").join(this.config.root_dir, "."), (err, readFiles) =>{
			if (err) throw err;
			var fileList = [];

			readFiles.filter( (file) =>{
				console.log(file);
			    return /.*\.md$/.test(file); //絞り込み
			}).forEach( (file) =>{
			    fileList.push(file);
			});

			fileList.map( (file) => {;
		    	fs.readFile(require("path").join(this.config.root_dir, file), 'utf8', (err, text) => {
		    		if (err) throw err;

		    		this.files.push({
		    			name   : file,
		    			content: text,
		    			active : false,
						hide   : false,
						unsaved: false
		    		});
				});
			});
		});
	}
};

module.exports = template;
