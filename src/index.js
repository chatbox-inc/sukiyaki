const Vue = require("vue");
const App = require("./app.vue");
const fs  = require("fs");
const path = require("path");
const sukiyakiPass = path.join(process.env.HOME || process.env.USERPROFILE, ".sukiyaki");
const Sukiyaki = require("./sukiyaki");
window.sukiyaki = new Sukiyaki();

Promise.resolve()
.then( () => {
	return new Promise( (resolve, reject) => {
		fs.mkdir(sukiyakiPass, function (err){
			if(err){
				console.log("OK.");
				resolve();
				return;
			}

			fs.writeFile(
				path.join(sukiyakiPass, "file_io.js"),
				fs.readFileSync("./io_core.js"),
				(err) => {
					if(err){
						console.log("Error.");
						reject();
						return;
					}
					console.log("OK.");
					resolve();
				}
			);
		});
	});
})
.then( () => {
	new Vue({
		el: "body",
		components: { App }
	});
});
