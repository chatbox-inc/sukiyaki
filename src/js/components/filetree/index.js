const fs = require("fs");

const template = {
	template: require("./index.html"),
	data: () => {
		return {
			files: require("../../stores/files")
		}
	},
	created: function() {
		fs.readdir('.', (err, readFiles) =>{
			if (err) throw err;
			var fileList = [];

			readFiles.filter( (file) =>{
			    return fs.statSync(file).isFile() && /.*\.md$/.test(file); //絞り込み
			}).forEach( (file) =>{
			    fileList.push(file);
			});

			fileList.map( (file) => {
		    	fs.readFile('./' + file, 'utf8', (err, text) => {
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
