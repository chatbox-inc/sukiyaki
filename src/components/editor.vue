<template lang="html">
	<div class="editor">
		<div class="editor-content-wrapper">
			<input type="" name="" class="file-title-input" placeholder="タイトルを入力" v-model="file.title" v-on:keyup="preview">

			<textarea placeholder="Type here...." class="editor-textarea" v-bind:style="{ tabSize: config.indent_width }" v-on:keyup="preview" v-on:keydown="insertTab" v-model="file.content"></textarea>
		</div>
	</div>
</template>

<style lang="scss">
.editor{
	flex-grow:1;
	width: 50%;
	height: 100%;
	background: #f5f5f5;

	&::-webkit-scrollbar{
		display:none;
	}

	.editor-content-wrapper{
		height: calc(100% - 10px);
		padding: 0;
		position: relative;
		overflow: hidden;



		.editor-textarea{
			width: calc(100% - 40px);
			height: calc(100% - 78px);

			margin: 10px;
			padding: 10px;
			border: none;
			outline: none;
			line-height: 1.6;
			font-size: 12px;
			background: #f0f0f0;
			border-radius: 0 0 4px 4px / 0 0 4px 4px;
			resize: none;
		}
	}
}
</style>

<script>
const template = {
	data: () => {
		return {
			file   : require("../stores/currentFile"),
			config : require("../stores/config"),
			stores : require("../stores")
		};
	},

	methods: {
		preview: function (){
			let target = null;
			let content = "# " + this.file.title + "\n" + this.file.content;

			this.stores.files.map( (file) => {
				if(file.active){
					if(content != file.content) file.unsaved = true;
					target = file;
				}
				return file;
			});

			target.content = "# " + this.file.title + "\n" + this.file.content;

			let action = require("../services/action");
			action.preview(
				this.file.title,
				this.file.content
			);
		},

		insertTab: function (event){
			if (event.keyCode !== 9) return;
			event.preventDefault();

			let width = (this.config.indent_type == "tabs" ? 1 : +this.config.indent_width);
			let spacing = (
				this.config.indent_type == "tabs" ?
				"\t" :
				Array((+this.config.indent_width)+1).join(" ")
			);
			let element = event.target;
			let val = element.value;
			let position = element.selectionStart;

			element.value = val.substr(0, position) + spacing + val.substr(position, val.length);
			element.setSelectionRange(position + width, position + width);
		}
	}
};

module.exports = template;
</script>
