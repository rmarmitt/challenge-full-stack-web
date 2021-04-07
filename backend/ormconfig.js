module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["./src/entity/**/*.ts"],
  migrations: ["./src/migration/**/*.ts"],
  cli: {
    migrationsDir: "./src/migration",
  },
};
