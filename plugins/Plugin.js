class Plugin {
  constructor(name) {
    this.name = name;
  }

  execute(data) {
    throw new Error("execute(data) must be implemented by subclasses");
  }
}

module.exports = Plugin;
