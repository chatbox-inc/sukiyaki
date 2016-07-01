const fs = require("fs");

var io_core = {
	getList: function (readDir) {
		console.log(this);
		return new Promise( (resolve, reject) => {

			Promise.resolve()
			.then( () => {
				console.log(this);
				return this.getFileList(readDir);
			})
			.then( (fileList) => {
				Promise.all(
					fileList.map( (file) => {
						return new Promise( (resolve, reject) => {
							fs.readFile(require("path").join(readDir, file), 'utf8', (err, text) => {
								if (err) reject(err);

								resolve({
									name   : file,
									content: text
								});
							});
						});
					})
				).then( (files) => {
					resolve(files);
				});
			})
		});
	},

	

	getFileList: (readDir) => {
		return new Promise ( (resolve, reject) => {

			fs.readdir(require("path").join(readDir, "."), (err, readFiles) =>{
				if (err) reject(err);
				var fileList = [];

				readFiles.filter( (file) =>{
					console.log(file);
				    return /.*\.md$/.test(file); //絞り込み
				}).forEach( (file) =>{
				    fileList.push(file);
				});

				resolve(fileList);
			});
		});
	}
};
module.exports = io_core;
