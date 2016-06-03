var fs = require('fs');
var $ = require('jquery');
var marked = require('marked');
var nl2br = require('nl2br');

var remote = require('electron').remote;
var dialog = remote.dialog;
var browserWindow = remote.BrowserWindow;

var currentPath = "";

$( _=> {

	fs.readdir('.', function(err, files){
		if (err) throw err;
		var fileList = [];
		files.filter(function(file){
		    return fs.statSync(file).isFile() && /.*\.md$/.test(file); //絞り込み
		}).forEach(function (file) {
		    fileList.push(file);
		});

	    console.log(fileList);

	    $.each(fileList, function() {
	    	fs.readFile('./' + this, 'utf8', (err, text) => {
	    		if (err) throw err;

				$('.filetree-list').append(
					'<li class="filetree-list-content">\
						<b>' + this + '</b>\
						<p class="filetree-list-content-body">\
							' + nl2br(text, false) + '\
						</p>\
					</li>'
				);
			});
	    });
	});

	function save(){

		//　初期の入力エリアに設定されたテキストを保存しようとしたときは新規ファイルを作成する
		if (currentPath == "") {
			saveNewFile();
			return;
		}

	    var win = browserWindow.getFocusedWindow();
	 
	    dialog.showMessageBox(win,
	        {
	            title: 'ファイルの上書き保存を行います。',
	            type: 'info',
	            buttons: ['OK', 'Cancel'],
	            detail: '本当に保存しますか？'
	        },
	        // メッセージボックスが閉じられた後のコールバック関数
	        function (respnse) {
	            // OKボタン(ボタン配列の0番目がOK)
	            if (respnse == 0) {
	                var data = $(".editor-textarea").val();
	                writeFile(currentPath, data);
	            }
	        }
	    );
	};

	function saveNewFile() {

		var win = browserWindow.getFocusedWindow();
		dialog.showSaveDialog(
			win,
			// どんなダイアログを出すかを指定するプロパティ
			{
				properties: ['openFile'],
				filters: [
					{
						name: 'Documents',
						extensions: ['txt', 'text', 'html', 'js']
					}
				]
			},
			// セーブ用ダイアログが閉じられた後のコールバック関数
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
		fs.writeFile(path, data, function (error) {
			if (error != null) {
				alert('error : ' + error);
				return;
			}
		});
	}

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

	$(document).on('click', '.filetree-list-content', function(event) {
		event.preventDefault();
		$('.filetree-list-content').removeClass('active');
		$(this).addClass('active');
	});

	$(document).on('click', '.button-new-file', function(event) {
		event.preventDefault();
		$('.filetree-list').prepend(
			'<li class="filetree-list-content">\
				<b>新規ファイル</b>\
				<p>\
					\
				</p>\
			</li>'
		);
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

	$(document).on('click', '.button-settings', function(event) {
		event.preventDefault();
		$(".editor").css("display", "none");
		$(".settings").css("display", "block");

		$('.button-file-list').removeClass('active');
		$('.button-settings').addClass('active');
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
		var title = $(marked(($(this).val().replace(/\r\n|\r/g, "\n").split('\n'))[0]));
		$(".file-title").text(title.text());
		var md = marked($(this).val());
		$(".editor-preview .editor-content-wrapper").html(md);
	});

	$(window).keydown(function(event){
		if(event.keyCode !== 83) return;
		if(event.shiftKey || event.metaKey) save();
	});
})