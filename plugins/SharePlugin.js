const Plugin = require("./plugin");

class SharePlugin extends Plugin {
  constructor() {
    super("SharePlugin");
  }

  execute(data) {
    return `🔗 SharePlugin: Post "${data.content}" shared to social media.`;
  }
}

module.exports = SharePlugin;
