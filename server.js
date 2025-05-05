// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const PluginManager = require("./pluginManager");
// const PostPlugin = require("./plugins/postPlugin");
// const SharePlugin = require("./plugins/sharePlugin");
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const manager = new PluginManager();
// manager.register(new PostPlugin());
// manager.register(new SharePlugin());

// app.get("/plugins", (req, res) => {
//   res.json(manager.list());
// });

// app.post("/share", (req, res) => {
//   const post = req.body;
//   const result = manager.runAll(post);
//   res.json({ result });
// });

// app.listen(4000, () => {
//   console.log("🚀 Backend running at http://localhost:4000");
// });
// backend/index.js
const express = require("express");
const cors = require("cors");

// Base Plugin Interface
class SharePlugin {
  constructor(name) {
    this.name = name;
  }

  generateShareUrl(content) {
    throw new Error("generateShareUrl must be implemented by plugin");
  }
}

// Concrete Plugins
class FacebookSharePlugin extends SharePlugin {
  constructor() {
    super("Facebook");
  }

  generateShareUrl(content) {
    const url = encodeURIComponent("https://example.com");
    const quote = encodeURIComponent(content);
    return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
  }
}

class TwitterSharePlugin extends SharePlugin {
  constructor() {
    super("Twitter");
  }

  generateShareUrl(content) {
    const tweet = encodeURIComponent(content);
    return `https://twitter.com/intent/tweet?text=${tweet}`;
  }
}

class LinkedInSharePlugin extends SharePlugin {
  constructor() {
    super("LinkedIn");
  }

  generateShareUrl(content) {
    const url = encodeURIComponent("https://example.com");
    const title = encodeURIComponent(content);
    return `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
  }
}

// Plugin Manager
class PluginManager {
  constructor() {
    this.plugins = new Map();
  }

  register(plugin) {
    this.plugins.set(plugin.name, plugin);
  }

  getShareUrl(platform, content) {
    const plugin = this.plugins.get(platform);
    if (!plugin) throw new Error(`No plugin found for ${platform}`);
    return plugin.generateShareUrl(content);
  }
}

// Setup
const app = express();
app.use(cors());
app.use(express.json());

const pluginManager = new PluginManager();
pluginManager.register(new FacebookSharePlugin());
pluginManager.register(new TwitterSharePlugin());
pluginManager.register(new LinkedInSharePlugin());

// Endpoint
app.post("/share", (req, res) => {
  const { content, platform } = req.body;

  try {
    const url = pluginManager.getShareUrl(platform, content);
    res.json({ success: true, shareUrl: url });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
