class PluginManager {
  constructor() {
    this.plugins = [];
  }

  register(plugin) {
    this.plugins.push(plugin);
  }

  runAll(data) {
    return this.plugins.map((plugin) => plugin.execute(data));
  }

  list() {
    return this.plugins.map((p) => p.name);
  }
}

module.exports = PluginManager;
