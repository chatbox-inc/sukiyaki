var $ = require('jquery');

$( _=> {
	$(document).on('click', '.filetree-list-content', function(event) {
		event.preventDefault();
		$('.filetree-list-content').removeClass('active');
		$(this).addClass('active');
	});

	$(document).on('click', '.new-file', function(event) {
		event.preventDefault();
		$('.filetree-list').prepend(
			'<li class="filetree-list-content">\
				<b>' + parseInt(Math.random()*100) + '.md</b>\
				<p>\
					要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約要約\
				</p>\
			</li>'
		);
	});
})