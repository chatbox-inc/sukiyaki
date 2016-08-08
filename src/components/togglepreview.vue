<template lang="html">
	<a href="#" class="editor-toggle-preview" title="プレビューの表示を切り替えます。" v-on:click="toggle">
		<i class="fa fa-fw {{status == 'show' ? 'fa-eye' : 'fa-eye-slash'}}"></i>
	</a>
</template>

<style lang="scss">
</style>

<script>
const template = {
	data: () => {
		return {
			"stores" : require("../stores/"),
			"status" : "show"
		};
	},

	created: function() {
	},

	methods: {
		toggle: function() {
			let action = require("../services/action");
			this.status = (this.status == "show" ? "hide" : "show");
			action.togglePreviewArea();
		}
	}
};

module.exports = template;
</script>
