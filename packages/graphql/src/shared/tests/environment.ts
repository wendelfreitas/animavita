const MMS = require('mongodb-memory-server');
const NodeEnvironment = require('jest-environment-node');

const {default: MongodbMemoryServer} = MMS;

class MongoDbEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.mongod = new MongodbMemoryServer({
      binary: {
        version: '4.2.3',
        skipMD5: true,
      },
      autoStart: false,
    });
  }

  async setup() {
    await super.setup();
    await this.mongod.start();
    this.global.__MONGO_URI__ = await this.mongod.getUri();
    this.global.__MONGO_DB_NAME__ = await this.mongod.getDbName();
    this.global.__COUNTERS__ = {
      user: 0,
    };
  }

  async teardown() {
    await super.teardown();
    await this.mongod.stop();
    this.mongod = null;
    this.global = {};
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoDbEnvironment;
