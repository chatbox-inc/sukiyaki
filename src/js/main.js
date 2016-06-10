const fs     = require('fs');
const $      = require('jquery');
const marked = require('marked');
const nl2br  = require('nl2br');
const Vue    = require('vue');
const remote = require('electron').remote;
const dialog = remote.dialog;
const browserWindow = remote.BrowserWindow;

var currentFile = {
	name: "",
	title: "",
	content: ""
};
var currentPreview = {
	title: "",
	content: ""
};

var files = [];

var fileTree = new Vue({
	el: ".filetree-list",
	data : {
		files : files
	}
});

var editor = new Vue({
	el: ".editor-edit",
	data : currentFile
});

var preview = new Vue({
	el: ".editor-preview",
	data : currentPreview
});

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});

function doLivePreview(title, text){
	var md = marked(text);
	currentPreview.title = title;
	currentPreview.content = md;
}

$( _=> {

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

	    		files.push({
	    			name   : file,
	    			content: text,
	    			active : false,
	    		});
			});
		});
	});

	function openFile(name){
		var target = files.map( (file) => {
				file.active = (file.name == name);
				return file;
			})
			.find( (file) => {
				return file.name == name;
			});

		var text    = target.content.replace(/\r\n|\r/g, "\n");
		var raw_content = text.split("\n");
		var title   = raw_content[0].replace("# ", "");
		var content = "";

		raw_content.shift();

		raw_content.forEach( (line) => {
			content += line + "\n";
		});

		currentFile.name = target.name;
		currentFile.title = title;
		currentFile.content = content;

		doLivePreview(
			title,
			content
		);
	}

	function newFile(){
		if( files.find((file) =>{ return file.name == ""; }) === undefined){
			files.map( (file) => {
				file.active = false;
				return file;
			});
			files.unshift({
				name   : "",
				content: "",
				active : true
			});
			openFile("");
		}
	}

	function save(){
		if (currentFile.name == "") {
			saveNewFile();
			return;
		}
		
		var data = "# " + $(".file-title").text() + "\n" + $(".editor-textarea").val();
		writeFile("./"+currentFile.name, data);
	};

	function saveNewFile() {
		var win = browserWindow.getFocusedWindow();
		dialog.showSaveDialog(
			win,

			{
				properties: ['openFile'],
				filters: [
					{
						name: 'Desktop',
						extensions: ['md']
					}
				]
			},

			function (fileName) {
				if (fileName) {
					var target = files.find( (file) => {
						return file.name == "";
					});
					target.name = fileName;
					currentFile.name = fileName;

					var data = $(".file-title") + "\n" + $(".editor-textarea").val();
					currentPath = fileName;
					writeFile(currentPath, data);
				}
			}
		);
	}

	function writeFile(path, data) {
		fs.writeFile(path, data, function (error) {
			if (error === null) return;

			alert('error : ' + error);
			return;
		});
	}


	$(document).on('click', '.button-new-file', function(event) {
		event.preventDefault();
		newFile();
	});

	$(document).on('click', '.filetree-list-content', function(event) {
		event.preventDefault();
		openFile($(this).attr("data-filename"));
	});

	$(document).on('click', '.editor-toggle-preview', function(event) {
		event.preventDefault();
		$(this).children('.fa').toggleClass('fa-eye').toggleClass('fa-eye-slash');

		$('.editor-preview')
		.toggleClass('editor-preview-hide')
		.attr(
			"data-is-active",
			($(".editor-toggle-preview").attr("data-is-active") == "1") ? "0" : "1"
		);
	});

	$(document).on('click', '.button-file-list', function(event) {
		event.preventDefault();
		if($(".button-settings").hasClass('active')){
			$('.button-file-list').addClass('active');
			$('.button-settings').removeClass('active');
			$(".settings").toggleClass("settings-is-hidden");
			return;
		}
		$('.button-file-list').toggleClass('active');
		$('.filetree').toggle();
		$('.editor-main').toggleClass('editor-main-is-full');
	});

	$(document).on('click', '.button-settings', function(event) {
		event.preventDefault();
		$(".settings").toggleClass("settings-is-hidden");

		$('.button-file-list').removeClass('active');
		$('.button-settings').toggleClass('active');
	});

	// Tab Key
	$(".editor-textarea").keydown(function(event){
    	if (event.keyCode === 9) {
        	event.preventDefault();
        	var element = event.target;
        	var val = element.value;
        	var position = element.selectionStart;
       		element.value = val.substr(0, position) + '\t' + val.substr(position, val.length);
        	element.setSelectionRange(position + 1, position + 1);
    	}
	});


	$('.editor-textarea, .file-title-input').on('blur keyup', function(event) {
		doLivePreview(
			$(".file-title-input").val(),
			$(".editor-textarea").val()
		);
	});

	$(window).keydown(function(event){
		if(event.keyCode !== 83) return;
		if(event.shiftKey || event.metaKey) save();
	});
})