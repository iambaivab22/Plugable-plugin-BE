const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); // Enable CORS

class Plugin {
  constructor(name) {
    this.name = name;
  }

  execute() {
    return `${this.name} plugin executed.`;
  }
}

class PluginManager {
  constructor() {
    this.plugins = [];
  }

  register(plugin) {
    this.plugins.push(plugin);
  }

  runAll() {
    return this.plugins.map((p) => p.execute());
  }

  list() {
    return this.plugins.map((p) => p.name);
  }
}

const manager = new PluginManager();
manager.register(new Plugin("Logger"));
manager.register(new Plugin("Analytics"));

app.get("/plugins", (req, res) => {
  res.json(manager.list());
});

app.get("/run", (req, res) => {
  res.json(manager.runAll());
});

app.listen(4000, () => console.log("Plugin API running on port 4000"));
