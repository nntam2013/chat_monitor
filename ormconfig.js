module.exports = {
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: 3306,
  username: "root",
  password: "vieccotutu",
  database: process.env.DB_NAME || "test_db",
  charset: "utf8",
  driver: "mysql",
  synchronize: process.env.NODE_ENV !== "production",
  entities: [
    "**/**.entity.ts",
    // '**/**.entity.js'
  ],
  logging: process.env.NODE_ENV !== "production" ? "all" : "error",
  migrations: ["migration/*.ts"],
  cli: {
    migrationsDir: "migration",
  },
  connectTimeout: 30000,
  acquireTimeout: 30000,
};
