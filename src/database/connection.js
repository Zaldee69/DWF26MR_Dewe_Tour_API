const { Sequelize } = require("sequelize");
const db = {};

const sequelize = new Sequelize("db_dewe_tours", "root", "insert_password", {
  host: "localhost",
  dialect: "mysql",
});

db.sequelize = sequelize;

module.exports = db;
