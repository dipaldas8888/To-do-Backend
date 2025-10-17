// server.js
const express = require("express");
const dotenv = require("dotenv");
const { connectDB, sequelize } = require("./config/db");

dotenv.config();
console.log(process.env.MYSQL_USER, process.env.MYSQL_DB);

const app = express();

app.use(express.json());

connectDB();

const User = require("./models/userModel");
const Todo = require("./models/todoModel");

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ All models synced with MySQL DB");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
