var Vue = require("vue");

var navigation = require("./navigation");
Vue.component('navigation', Vue.extend(navigation));

var filetree = require("./filetree");
Vue.component('filetree', Vue.extend(filetree));

var editor = require("./editor");
Vue.component('editor', Vue.extend(editor));

var preview = require("./preview");
Vue.component('preview', Vue.extend(preview));
