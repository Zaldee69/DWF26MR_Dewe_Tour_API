"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      transaction.belongsTo(
        models.trip,
        {
          as: "trips",
          foreignKey: {
            name: "trip",
          },
        },
        transaction.belongsTo(models.user, {
          as: "users",
          foreignKey: {
            name: "user",
          },
        })
      );
    }
  }
  transaction.init(
    {
      counterQty: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
      trip: DataTypes.INTEGER,
      user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
