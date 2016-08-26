<template lang="html">
	<div class="filetree">
		<div class="filetree-header">
			<input type="text" name="search" placeholder="Search File..." class="filetree-search" v-model="searchText" v-on:keyup="search">
		</div>

		<ol class="filetree-list">
			<li class="filetree-list-content {{file.active ? 'active' : ''}} {{file.hide ? 'hide' : ''}} {{file.unsaved ? 'unsaved' : ''}}" v-for="file in files" v-on:click="open" data-filename="{{file.name}}">
				<b class="filetree-list-content-filename">{{file.name != "newFile" ? file.name : "新規ファイル"}}</b>
				<p class="filetree-list-content-body">
					{{{file.content}}}
				</p>
			</li>
		</ol>
	</div>
</template>

<style lang="scss">
.filetree{
	width: 200px;
	background: #555;
	flex-grow: 0;
	font-family:  "游ゴシック", YuGothic;

	.filetree-header{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		border-bottom: solid 1px #444;
	}

	.filetree-search{
		width: 134px;
		height: 16px;

		color: #999;
		background: #444;

		border-radius: 4px;
		border: none;

		padding: 2px 3px;

		outline: none;
	}

	.filetree-list{
		height: calc(100% - 41px);
		overflow: scroll;

		.filetree-list-content{
			width: calc(100% - 20px);
			height: 69px;
			padding: 8px 10px;

			color: #fff;
			font-size: 10px;

			border-top: solid 1px rgba(255, 255, 255, 0.2);
			border-bottom: solid 1px #444;
			position: relative;

			cursor: pointer;

			*{
				pointer-events: none;
			}

			b{
				font-size: 12px;
			}

			.filetree-list-content-body{
				font-size: 10px;
				font-weight: 100;
				letter-spacing: 1px;
				line-height: 1.6;
				height: 48px;
				overflow: hidden;
			}

			&.hide{
				display: none;
			}

			&.active{
				background: rgba(255, 255, 255, 0.1);
			}

			&.unsaved{
				&:before{
					content: "";
					position: absolute;

					top: 12px;
					right: 10px;

					width: 6px;
					height: 6px;

					background: #49B6FA;
					border: solid 1px rgba(255, 255, 255, 0.1);
					border-radius: 50%;
				}
			}

			&:last-child{
				&:after{
					display: block;
					content: "";
					position: absolute;
					left:0;
					bottom: -2px;
					width: 100%;
					height: 1px;
					background: rgba(255, 255, 255, 0.2);
				}
			}
		}
	}
}
</style>

<script>
const template = {
	data: () => {
		return {
			searchText           : "",
			stores               : require("../stores"),
			files                : require("../stores/files"),
			globalFiles          : window.sukiyaki.files
		};
	},

	created: function() {
		let action = require("../services/action");
		action.newFile = this.newFile;
		action.openFile = this.open;
		action.save = this.save;
		action.writeFile = this.writeFile;

		window.sukiyaki.get();
		setInterval(() => {console.log(this.files)}, 1000);
	},

	watch: {
		"globalFiles": function (data, OldData){
			this.files = data;
		}
	},

	methods: {
		newFile: function(name) {
			if( this.globalFiles.find((file) =>{ return file.name == "newFile"; }) === undefined){
				this.globalFiles.map( (file) => {
					file.active = false;
					return file;
				});
				window.sukiyaki.files.unshift({
					name   : "newFile",
					content: "",
					active : true,
					hide   : false,
					unsaved: false
				});
				this.open("newFile");
			}
		},

		save: function() {
			let target = null;
			let action = require("../services/action");

			this.globalFiles.map( (file) => {
				if(file.active){
					file.unsaved = false;
					target = file;
				}
				return file;
			});

			if (this.stores.currentFile.name == "newFile") {
				action.showSaveDialog();
				return;
			}

			target = this.globalFiles.find( (file) => {
				return file.active;
			});

			console.log(target);

			this.writeFile(
				this.stores.config.root_dir,
				this.stores.currentFile.name,
				target.content
			);
		},

		writeFile: function(dir, name, content){
			window.sukiyaki.save(
				dir,
				name,
				content
			);
		},

		open: function(e) {
			let action = require("../services/action");

			let name = e;
			if(typeof(e) == "object" ){
				name = event.target.dataset.filename;
			}

			let target = this.globalFiles.map( (file) => {
				file.active = (file.name == name);
				return file;
			})
			.find( (file) => {
				return file.name == name;
			});

			let text    = target.content.replace(/\r\n|\r/g, "\n");
			let raw_content = text.split("\n");
			let title   = raw_content[0].replace("# ", "");
			let content = "";

			raw_content.shift();

			raw_content.forEach( (line, index) => {
				if(index != raw_content.length - 1) content += line + "\n";
			});

			this.stores.currentFile.name = target.name;
			this.stores.currentFile.title = title;
			this.stores.currentFile.content = content;

			action.preview(
				title,
				content,
				text
			);
		},

		search: function (){
			console.log(this.searchText);
			if(!this.searchText){
				this.globalFiles.map( (file) => {
					file.hide = false;
					return file;
				});
				return;
			}

			this.globalFiles.map( (file) => {
				file.hide = (file.name.indexOf(this.searchText) != 0);
				return file;
			});
		}
	}
};

module.exports = template;
</script>
