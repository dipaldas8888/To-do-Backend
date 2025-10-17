const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./userModel");

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Todo, { foreignKey: "userId" });
Todo.belongsTo(User, { foreignKey: "userId" });

module.exports = Todo;
