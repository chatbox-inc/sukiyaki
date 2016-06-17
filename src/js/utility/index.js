const marked = require('marked');
const nl2br  = require('nl2br');

var utility = {
	marked: marked,
	nl2br : nl2br,

	init: () =>{
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
	}
};

module.exports = utility;
