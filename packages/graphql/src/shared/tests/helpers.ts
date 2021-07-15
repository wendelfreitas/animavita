import mongoose from 'mongoose';

export const gql = String.raw;

process.env.NODE_ENV = 'test';

const mongooseOptions = {
  autoIndex: true,
  autoReconnect: false,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

export async function connectMongoose(customMongooseOptions = {}) {
  jest.setTimeout(20000);
  return mongoose.connect(global.__MONGO_URI__, {
    ...mongooseOptions,
    ...customMongooseOptions,
    dbName: global.__MONGO_DB_NAME__,
  });
}

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

export async function disconnectMongoose() {
  await mongoose.disconnect();

  // dumb mongoose
  for (const connection of mongoose.connections) {
    const modelNames = Object.keys(connection.models);

    for (const modelName of modelNames) {
      delete connection.models[modelName];
    }

    const collectionNames = Object.keys(connection.collections);

    for (const collectionName of collectionNames) {
      delete connection.collections[collectionName];
    }
  }
}

export async function clearDbAndRestartCounters() {
  await clearDatabase();
}
