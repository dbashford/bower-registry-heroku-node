var bowerRegistry = require('bower-registry'),
    Registry = bowerRegistry.Registry,
    RedisDb = bowerRegistry.RedisDb,
    port = process.env.PORT || 3100,
    options = {};

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var redis = require("redis").createClient(rtg.port, rtg.hostname);
  redis.auth(rtg.auth.split(":")[1]);
  options.client = redis
} else {
  options.client = require("redis").createClient();
}

var registry = new Registry({
  db: new RedisDb(options)
});

registry.initialize().listen(port);