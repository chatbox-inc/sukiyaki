<template lang="html">
	<nav class="navigation">
		<ul class="navigation-list">

			<li class="navigation-content button-new-file" v-on:click="newFile">
				<i class="fa fa-fw fa-file-text-o"></i>
			</li>

			<li class="navigation-content active button-file-list" v-on:click="toggleFileList">
				<i class="fa fa-fw fa-folder-open-o"></i>
			</li>

			<li class="navigation-content button-settings" v-on:click="toggleSettings">
				<i class="fa fa-fw fa-gear"></i>
			</li>

		</ul>
	</nav>
</template>

<style lang="scss">
.navigation{
	width: 50px;
	height: 100%;
	background: #444;
	.navigation-list{
		width: 100%;
		height: 100%;

		.navigation-content{
			width: 50px;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content:center;
			text-align: center;
			position: relative;
			z-index: 100;

			cursor: pointer;

			color: #ccc;
			font-size: 22px;

			&:hover, &.active{
				color: #f0f0f0;
			}

			&.active:before{
				content: "";

				position: absolute;
				top: 10px;
				right: 0;

				width: 47px;
				height: 40px;
				background: #555;

				border-radius: 8px 0 0 8px / 8px 0 0 8px;
				z-index: -1;
			}
		}
	}
}
</style>

<script>
const template = {
	methods: {
		newFile: function() {
			let action = require("../services/action");
			action.newFile("newFile");
		},

		toggleFileList: function() {
			let $ = require("jquery");
			if($(".button-settings").hasClass("active")){
				$(".button-file-list").addClass("active");
				$(".button-settings").removeClass("active");
				$(".settings").toggleClass("settings-is-hidden");
				return;
			}
			$(".button-file-list").toggleClass("active");
			$(".button-file-list .fa").toggleClass("fa-folder-open-o fa-folder-o");
			$(".filetree").toggle();
			$(".main-wrap").toggleClass("is-full");
		},

		toggleSettings: function() {
			let $ = require("jquery");
			$(".settings").toggleClass("settings-is-hidden");
			$(".button-file-list").removeClass("active");
			$(".button-settings").toggleClass("active");
		}
	}
};

module.exports = template;
</script>
