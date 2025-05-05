const Plugin = require("./plugin");

class PostPlugin extends Plugin {
  constructor() {
    super("PostPlugin");
  }

  execute(data) {
    return `📝 PostPlugin: Post "${data.content}" saved successfully.`;
  }
}

module.exports = PostPlugin;
