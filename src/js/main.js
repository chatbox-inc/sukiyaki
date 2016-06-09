const fs     = require('fs');
const $      = require('jquery');
const _      = require('underscore');
const marked = require('marked');
const nl2br  = require('nl2br');
const Vue    = require('vue');
const remote = require('electron').remote;
const dialog = remote.dialog;
const browserWindow = remote.BrowserWindow;

var isCreatedNewFile = false;
var currentPath = "";
var files = [];

var fileTree = new Vue({
	el: ".filetree-list",
	data : {
		files : files
	}
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

$( _=> {

	fs.readdir('.', (err, readFiles) =>{
		if (err) throw err;
		var fileList = [];

		readFiles.filter( (file) =>{
		    return fs.statSync(file).isFile() && /.*\.md$/.test(file); //絞り込み
		}).forEach( (file) =>{
		    fileList.push(file);
		});

		_.map(fileList, (file) => {
	    	fs.readFile('./' + file, 'utf8', (err, text) => {
	    		if (err) throw err;

	    		files.push({
	    			name   : file,
	    			content: nl2br(text, false),
	    			active : false
	    		});
			});
		});
	});

	function newFile(){
		if(! isCreatedNewFile){
			files.unshift({
				name   : "",
				content: "",
				active : true
			});
			isCreatedNewFile = true;
		}
	}

	function save(){
		if (currentPath == "") {
			saveNewFile();
			return;
		}
		
		var data = $(".editor-textarea").val();
		writeFile(currentPath, data);
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
					var data = $(".editor-textarea").val();
					currentPath = fileName;
					writeFile(currentPath, data);
				}
			}
		);
	}

	function writeFile(path, data) {
		_.map(files, (file) => {
			file.active = false;
			return file;
		});
		fs.writeFile(path, data, function (error) {
			if (error != null) {
				alert('error : ' + error);
				return;
			}
		});
	}

	$(document).on('click', '.filetree-list-content', function(event) {
		event.preventDefault();
		_.map(files, (file) => {
			file.active  = (file.name == $(this).children('.filetree-list-content-filename').text());
			return file;
		});
	});

	$(document).on('click', '.button-new-file', function(event) {
		event.preventDefault();
		newFile();
	});

	$(document).on('click', '.editor-toggle-preview', function(event) {
		event.preventDefault();
		$(this).children('.fa').toggleClass('fa-eye').toggleClass('fa-eye-slash');
		if($(".editor-toggle-preview").attr("data-is-active") == "1"){
			$('.editor-preview').css({
				width:"50%",
				flexGrow:"1"
			});
			$(".editor-toggle-preview").attr("data-is-active", "0");
		}else{
			$('.editor-preview').css({
				width:"0%",
				flexGrow:"0"
			});
			$(".editor-toggle-preview").attr("data-is-active", "1");
		}
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

	$(".editor-textarea").keydown(function(event){
		// Tab
    	if (event.keyCode === 9) {
        	event.preventDefault();
        	var element = event.target;
        	var val = element.value;
        	var position = element.selectionStart;
       		element.value = val.substr(0, position) + '\t' + val.substr(position, val.length);
        	element.setSelectionRange(position + 1, position + 1);
    	}
	});

	$('.editor-textarea').on('blur keyup', function(event) {
		// event.preventDefault();
		$(".file-title").text($(".file-title-input").val());

		var md = marked($(this).val());
		$(".editor-preview .preview-content").html(md);
	});

	$(window).keydown(function(event){
		if(event.keyCode !== 83) return;
		if(event.shiftKey || event.metaKey) save();
	});
})