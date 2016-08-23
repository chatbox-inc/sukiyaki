(function(){
	console.log("Load complete file_io.js");

	const io_core = function() {

		this.get = (path) => {
			console.log("test");
			this
			.getList("/Users/potato4d/Documents/")
			.then( (getFiles) => {
				getFiles.map( (file) => {
					window.sukiyaki.files.push({
						name    : file.name,
						content : file.content,
						active  : false,
						hide    : false,
						unsaved : false
					});
				});
			});
		},

		this.getList = function (readDir) {
			return new Promise( (resolve) => {

				Promise.resolve()
				.then( () => {
					return this.getFileList(readDir);
				})
				.then( (fileList) => {
					Promise.all(
						fileList.map( (file) => {
							return new Promise( (resolve, reject) => {
								const fs = require("fs");
								fs.readFile(require("path").join(readDir, file), "utf8", (err, text) => {
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
				});
			});
		},

		this.save = (saveDir, filename, data) => {
			return new Promise( (resolve, reject) => {
				const fs = require("fs");
				fs.writeFile(require("path").join(saveDir, filename), data, function (error) {
					if (error === null) resolve();
					reject(error);
				});
			});
		},

		this.getFileList = (readDir) => {
			return new Promise ( (resolve, reject) => {
				const fs = require("fs");
				fs.readdir(require("path").join(readDir, "."), (err, readFiles) =>{
					if (err) reject(err);
					let fileList = [];

					readFiles.filter( (file) =>{
						return /.*\.md$/.test(file); //絞り込み
					}).forEach( (file) =>{
						fileList.push(file);
					});

					resolve(fileList);
				});
			});
		}
	};

	window.sukiyaki.register(
		"io_core",
		new io_core()
	);
}());
