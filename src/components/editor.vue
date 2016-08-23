<template lang="html">
	<div class="editor">
		<div class="editor-content-wrapper" v-show="(file.name != '' || file.content != '' || file.title != '')">
			<input type="" name="" class="file-title-input" placeholder="Type title here" v-model="file.title" v-on:keyup="preview">

			<textarea
				placeholder="Type text here...."
				v-bind:style="{ tabSize: config.indent_width }"
				v-on:keyup="preview"
				v-on:keydown="insertTab"
				v-model="file.content"
			></textarea>

			<footer>
				<div class="popup" v-if="isShowPlugins">
					<span class="popup-title">Execute Scripts on saved.</span>
					<ul>
						<li v-for="plugin in plugins">
							<input type="checkbox" name="{{ plugin.name }}" id="plugin-select-{{ plugin.name }}" v-model="plugin.active">
							<label for="plugin-select-{{ plugin.name }}">{{ plugin.name }}</label>
						</li>
					</ul>
				</div>
				<button type="button" class="scripts" v-on:click="isShowPlugins = !isShowPlugins">
					Scripts:
					<ul v-for="plugin in plugins">
						<li v-if="plugin.active">{{plugin.name}} </li>
					</ul>
				</button>
				<button type="button" class="save" v-on:click="save"><i class="fa fa-save"></i> Save</button>
			</footer>
		</div>
	</div>
</template>

<style lang="scss" scoped>
ul{
	list-style: none;
}

.editor{
	flex-grow:1;
	width: 50%;
	height: 100%;
	background: #f5f5f5;

	&::-webkit-scrollbar{
		display:none;
	}
}

.editor-content-wrapper{
	height: calc(100% - 10px);
	padding: 0;
	position: relative;
	overflow: hidden;
}

textarea{
	width: calc(100% - 40px);
	height: calc(100% - 128px);

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

footer{
	margin: 0 10px;
	display: flex;
	justify-content: space-between;
	position: relative;

	button{
		outline: none;
		cursor: pointer;
	}

	button.scripts{
		display: block;
		width: 80%;
		max-width: calc(100% - 90px);
		height: 30px;

		color: #615952;
		background: rgba(255,255,255,0.6);
		border: solid 1px #615952;

		appearance: none;

		text-align: left;

		ul, li{
			display: inline;
		}
	}

	button.save{
		display: block;
		width: calc(20% - 10px);
		min-width: 80px;

		height: 30px;

		color: #fff;
		background: #615952;
		border: solid 1px rgba(0,0,0,0.05);

		appearance: none;

		text-align: center;
		font-size: 14px;
	}

	.popup{
		width: calc(80% - 20px);
		max-width: calc(100% - 112px);
		height: 180px;
		padding: 10px;

		position: absolute;

		left: 0;
		bottom: 29px;

		color: #615952;
		background: #FBFBFB;
		border: solid 1px #615952;

		font-size: 12px;

		.popup-title{
			font-size: 12px;
			font-weight: bold;
			display: inline-block;
			margin: 0 0 5px;
		}
	}
}
</style>

<script>
const template = {
	data: () => {
		return {
			file    : require("../stores/currentFile"),
			config  : require("../stores/config"),
			stores  : require("../stores"),
			plugins : window.sukiyaki.plugins,
			isShowPlugins : false
		};
	},

	created: function(){
		console.log(this.file);
	},

	methods: {
		preview: function (){
			let target = null;
			let content = "# " + this.file.title + "\n" + this.file.content;

			window.sukiyaki.files.map( (file) => {
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
		},

		save: function() {
			let action = require("../services/action");
			action.save();
		}
	}
};

module.exports = template;
</script>
