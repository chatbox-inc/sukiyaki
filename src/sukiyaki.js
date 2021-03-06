const Sukiyaki = function(){
	this.plugins = [];
	this.usePluginIfStartLoad = localStorage.loadPlugin;
	this.files = [];

	this.get = () => {
		console.log("Running method `get`");

		this.plugins.map( (plugin) => {
			let config = require("./stores/config");
			if(plugin.name !== this.usePluginIfStartLoad) return;
			plugin.core.get(config.root_dir);
		});
	};

	this.save = (dir, name, content) => {
		console.log("Running method `save`");

		this.plugins.map( (plugin) => {
			if(plugin.active) plugin.core.save(dir, name, content);
		});
	};

	this.getConfig = () => {
		// TODO プラグインごとの値を追加できるように実装する
	};

	this.setAdmin = () => {
		// TODO 管理画面へのフォーム追加を実装する
	};

	this.register = (name, plugin) => {
		console.log(`register plugin "${name}"`);
		const pluginConfig = JSON.parse(localStorage.plugins);
		const isActive = (pluginConfig.find( (p) => {return p.name == name;}) || {active:false}).active;

		this.plugins.push({
			name: name,
			core: plugin,
			active: isActive
		});
	};
};

module.exports = Sukiyaki;
