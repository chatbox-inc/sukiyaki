<template lang="html">
	<div class="page settings settings-is-hidden">
		<h1>Settings</h1>

		<section>
			<h1 class="settings-title">エディタ設定</h1>

			<p><small>※設定を反映させるには再起動が必要です</small></p>

			<table class="settings-table">
				<tr class="settings-indent">
					<th>インデント</th>
					<td>
						<select name="" id="" v-on:change="changeIndent" v-model="indent_type">
							<option value="tabs">Tabs</option>
							<option value="spaces">Spaces</option>
						</select>

						<select name="" id="" v-on:change="changeIndent" v-model="indent_width">
							<option value="2">2 Spaces</option>
							<option value="4">4 Spaces</option>
						</select>
					</td>
				</tr>

				<tr>
					<th>ルートディレクトリ</th>
					<td><input size="30" v-model="root_dir" class="settings-detault-path" readonly><button class="settings-default-path-button" v-on:click="selectPath">パスを選択</button></td>
				</tr>
			</table>

		</section>
	</div>
</template>

<style lang="scss">
.page.settings{
	display: block;
	pointer-events: all;

	position: absolute;
	left: 0;
	top: 0;

	z-index: 1000;

	padding: 25px 20px 30px;

	width: calc(100% - 40px);
	height: calc(100vh - 55px);
	font-weight: 500;

	color: #999;
	background: #fff;

	opacity: 1.0;

	// transition: all 0.2s ease-out;

	&.settings-is-hidden{
		left: 25px;
		top: 25px;
		pointer-events: none;

		width: calc(100% - 90px);
		height: calc(100vh - 105px);
		opacity: 0.0;
	}

	.settings-title{
		margin: 30px 0  10px;
		font-size: 22px;
	}

	select{
	    -webkit-appearance: none;
	    width: auto;
	    padding: 5px 20px 5px 5px;
	    border-radius: 2px;
		background: linear-gradient(#F5F5F5, #E2E2E2);
		position: relative;
		outline: #0000ff;
	}
}
</style>

<script>
const template = {
	data: () => {
		return {
			indent_type: "",
			indent_width: "",
			root_dir: "",
			config: require("../stores/config")
		};
	},

	created: function (){
		this.indent_type = this.config.indent_type;
		this.indent_width = this.config.indent_width;
		this.root_dir = this.config.root_dir;
	},

	methods: {
		changeIndent: function() {
			let tempLocal = JSON.parse(localStorage.config);
			tempLocal.indent_type  = this.indent_type;
			tempLocal.indent_width = this.indent_width;
			localStorage.config = JSON.stringify(tempLocal);
		},

		selectPath: function() {
			let remote = require("electron").remote;
			let dialog = remote.dialog;
			let browserWindow = remote.BrowserWindow;
			event.preventDefault();
			let focusedWindow = browserWindow.getFocusedWindow();

			dialog.showOpenDialog(focusedWindow, {
				properties: ["openDirectory"]
			}, (directories) => {
				directories.forEach((directory) =>{
					this.root_dir = directory;
					let tempLocal = JSON.parse(localStorage.config);
					tempLocal.root_dir = directory;
					localStorage.config = JSON.stringify(tempLocal);
				});
			});
		}
	}
};

module.exports = template;
</script>
