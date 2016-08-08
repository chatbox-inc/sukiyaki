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

	methods: {
		hookKey: function(event) {
			let action = require("./services/action/");
			if(event.keyCode !== 83) return;
			if(event.shiftKey || event.metaKey) action.save();
		}
	}
};
</script>
