let Vue = require("vue");

let navigation = require("./navigation");
Vue.component("navigation", Vue.extend(navigation));

let editor = require("./editor");
Vue.component("editor", Vue.extend(editor));

let preview = require("./preview");
Vue.component("preview", Vue.extend(preview));

let settings = require("./settings");
Vue.component("settings", Vue.extend(settings));

let savedialog = require("./savedialog");
Vue.component("savedialog", Vue.extend(savedialog));

let filetree = require("./filetree");
Vue.component("filetree", Vue.extend(filetree));

let togglepreview = require("./togglepreview");
Vue.component("togglepreview", Vue.extend(togglepreview));
