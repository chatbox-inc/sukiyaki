<template lang="html">
	<div class="editor-preview {{status == 'hide' ? 'editor-preview-hide' : ''}}" data-is-active="{{status == 'show' ? '0' : '1'}}">
		<div class="editor-content-wrapper">
			<h1 class="file-title">{{file.title}}</h1>

			<div class="preview-content markdown-body">{{{file.content}}}</div>
		</div>
	</div>
</template>

<style lang="scss">
.editor-preview{
	width: 50%;
	flex-grow: 1;
	height: 100%;
	// transition: all 0.2s ease-out;

	&.editor-preview-hide{
		width:0%;
		flex-grow:0;
	}

	.editor-content-wrapper{
		height: 100%;
		padding: 0;
		position: relative;
		overflow: hidden;
	}

	.preview-content{
		width: calc(100% - 40px);
		height: calc(100% - 78px);
		overflow: scroll;

		margin: 10px;
		padding: 10px;
	}
}
</style>

<script>
const template = {
	data: () => {
		return {
			file: require("../stores/currentPreview"),
			stores: require("../stores/"),
			status: "show"
		};
	},

	created: function() {
		let action = require("../services/action");
		action.preview = this.preview;
		action.togglePreviewArea = this.toggle;
	},

	methods: {
		preview: function(title, content) {
			let marked = require("marked");
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

			let md = marked(content);
			this.stores.currentPreview.title = title;
			this.stores.currentPreview.content = md;
		},

		toggle: function() {
			this.status = (this.status == "show" ? "hide" : "show");
		}
	}
};

module.exports = template;
</script>
