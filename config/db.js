const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

console.log("Connecting to MySQL with:");
console.log("Host:", process.env.MYSQL_HOST);
console.log("User:", process.env.MYSQL_USER);
console.log("DB:", process.env.MYSQL_DB);

const sequelize = new Sequelize(
  process.env.MYSQL_DB || "todo_db",
  process.env.MYSQL_USER || "root",
  process.env.MYSQL_PASS || "",
  {
    host: process.env.MYSQL_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected successfully!");
  } catch (error) {
    console.error("❌ MySQL connection failed:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
