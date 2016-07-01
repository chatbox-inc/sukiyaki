let config;

if(! localStorage.config){
	localStorage.config = JSON.stringify({
		"indent_type"  : "tabs",
		"indent_width" : "4",
		"root_dir"     : require("path").join(process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"], "Documents")
	});
}

module.exports = JSON.parse(localStorage.config);
