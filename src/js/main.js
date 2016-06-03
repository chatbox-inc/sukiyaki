var $ = require('jquery');
var marked = require('marked');

$( _=> {
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
				<b>file' + parseInt(Math.random()*100) + '.md</b>\
				<p>\
					要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約\
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

	$*

	$(".editor-textarea").blur(function(event) {
		var title = $(marked(($(this).val().replace(/\r\n|\r/g, "\n").split('\n'))[0]));
		$(".file-title").text(title.text());
		var md = marked($(this).val());
		$(".editor-preview .editor-content-wrapper").html(md);
	});
})