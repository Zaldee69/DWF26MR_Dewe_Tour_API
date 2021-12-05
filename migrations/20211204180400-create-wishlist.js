"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("wishlists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      trip: {
        type: Sequelize.INTEGER,
        references: {
          model: "trips",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("wishlists");
  },
};
