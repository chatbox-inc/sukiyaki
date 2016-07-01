var Vue = require("vue");

var navigation = require("./navigation");
Vue.component('navigation', Vue.extend(navigation));

var editor = require("./editor");
Vue.component('editor', Vue.extend(editor));

var preview = require("./preview");
Vue.component('preview', Vue.extend(preview));

var settings = require("./settings");
Vue.component('settings', Vue.extend(settings));

var savedialog = require("./savedialog");
Vue.component('savedialog', Vue.extend(savedialog));

var filetree = require("./filetree");
Vue.component('filetree', Vue.extend(filetree));

var togglepreview = require("./togglepreview");
Vue.component('togglepreview', Vue.extend(togglepreview));
