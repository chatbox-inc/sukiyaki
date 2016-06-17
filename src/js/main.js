const fs     = require('fs');
const $      = require('jquery');
const Vue    = require('vue');

const utility = require("./utility");

const remote = require('electron').remote;
const dialog = remote.dialog;
const browserWindow = remote.BrowserWindow;

require("./components");

utility.init();

var stores = {
	files          : require("./stores/files"),
	currentFile    : require("./stores/currentFile"),
	currentPreview : require("./stores/currentPreview")
}

var app = new Vue({
	el: "#app"
});

function doLivePreview(title, text){
	var md = utility.marked(text);
	stores.currentPreview.title = title;
	stores.currentPreview.content = md;
}

$( _=> {

	function openFile(name){
		var target = stores.files.map( (file) => {
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

		stores.currentFile.name = target.name;
		stores.currentFile.title = title;
		stores.currentFile.content = content;

		doLivePreview(
			title,
			content
		);
	}

	function newFile(){
		if( stores.files.find((file) =>{ return file.name == ""; }) === undefined){
			stores.files.map( (file) => {
				file.active = false;
				return file;
			});
			stores.files.unshift({
				name   : "",
				content: "",
				active : true
			});
			openFile("");
		}
	}

	function save(){
		if (stores.currentFile.name == "") {
			saveNewFile();
			return;
		}

		var data = "# " + $(".file-title").text() + "\n" + $(".editor-textarea").val();
		writeFile("./"+stores.currentFile.name, data);
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

			(fileName) => {
				if (fileName) {
					var target = stores.files.find( (file) => {
						return file.name == "";
					});
					target.name = fileName;
					stores.currentFile.name = fileName;

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

			alert('エラーが発生しました : ' + error);
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
	$(document).on('keydown', '.editor-textarea', function(event) {
    	if (event.keyCode !== 9) return;
        event.preventDefault();
        var element = event.target;
        var val = element.value;
        var position = element.selectionStart;
       	element.value = val.substr(0, position) + '\t' + val.substr(position, val.length);
        element.setSelectionRange(position + 1, position + 1);
	});

	$(document).on('blur keyup', '.editor-textarea, .file-title-input', function(event) {
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
