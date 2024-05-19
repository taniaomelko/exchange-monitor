const config = {
  mongodb: {
    url: process.env.MONGO_URI,
    databaseName: process.env.DATABASE_NAME,
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
