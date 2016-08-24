<template lang="html">
	<navigation></navigation>

    <div class="wrapper" v-on:keydown="hookKey">
    	<div class="page main">
    		<filetree></filetree>

    		<div class="main-wrap">
    			<editor></editor>
    			<preview></preview>
    			<togglepreview></togglepreview>
    		</div>
    	</div>

    	<settings></settings>
    	<savedialog></savedialog>
    </div>
</template>

<style lang="scss">
.wrapper{
	width: calc(100% - 50px);
	height: 100%;
	position: relative;
}
</style>

<script>
let Vue = require("vue");

let navigation    = require("./components/navigation.vue");
let editor        = require("./components/editor.vue");
let preview       = require("./components/preview.vue");
let settings      = require("./components/settings.vue");
let savedialog    = require("./components/savedialog.vue");
let filetree      = require("./components/filetree.vue");
let togglepreview = require("./components/togglepreview.vue");

module.exports = {
	components: {
		navigation,
		editor,
		preview,
		settings,
		savedialog,
		filetree,
		togglepreview
	},

	data: () => {
		return {
			config : require("./stores/config"),
		};
	},

	created: function() {
		const fs = require("fs");
		const path = require("path");
		const root = path.join(process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"], ".sukiyaki");

		const files = fs.readdirSync(root);
		var fileList = [];

		files.filter(function(file){
			return fs.statSync(path.join(root, file)).isFile() && /.*\.js$/.test(file);
		}).forEach(function (file) {
			fileList.push(file);
		});

		fileList.map( (script) => {
			const $ = require("jquery");
			$("body").append("<script src='file://" + path.join(root, script) + "' />");
		});

	},

	methods: {
		hookKey: function(event) {
			let action = require("./services/action/");
			if(event.keyCode !== 83) return;
			if(event.shiftKey || event.metaKey) action.save();
		}
	}
};
</script>
