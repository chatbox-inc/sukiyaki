<template lang="html">
	<div class="modal savedialog modal-{{stores.saveDialog}}">
		<div class="modal-content">
			<input type="text" class="modal-content-input" placeholder="ファイル名を入力" name="filename" v-model="name" v-on:keydown="saveCheck">
		</div>
		<div class="modal-background" v-on:click="hide"></div>
	</div>
</template>

<style lang="scss">
.modal{
	position: absolute;
	left: -50px;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: 1000000000000000;
	display: flex;
	align-items: flex-start;
	justify-content: center;

	&-hide{
		display: none;
	}

	.modal-content{
		width: 400px;
		height: 60px;
		background: #f0f0f0;
		border-radius: 0 0 10px 10px;
		align-items: center;
		justify-content: center;
		display: flex;
		z-index: 100;

		.modal-content-input{
			width: 90%;
			height: 60%;
			border: none;
			border-radius: 10px;
			background: transparent;
			outline: none;
			font-size: 16px;
		}
	}

	.modal-background{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
	}
}
</style>

<script>
const template = {
	data: () => {
		return {
			"stores" : require("../stores/"),
			"name"   : ""
		};
	},

	created: function() {
		let action = require("../services/action");
		action.showSaveDialog = this.show;
		action.hideSaveDialog = this.hide;
		this.hide();
	},

	methods: {
		show: function() {
			this.stores.saveDialog = "show";
		},

		hide: function() {
			this.stores.saveDialog = "hide";
		},

		saveCheck: function(event) {
			let action = require("../services/action");

			if(event.keyCode == 13){
				if(this.name.indexOf(".md") == -1) this.name += ".md";
				let target;

				this.stores.files.map( (file) => {
					if(file.active){
						target = file;
						file.name = this.name;
					}
					return file;
				});
				action.writeFile(this.stores.config.root_dir, this.name, target.content);
				this.stores.currentFile.name = this.name;
				this.stores.saveDialog = "hide";
				this.name = "";
			}
		}
	}
};

module.exports = template;
</script>
