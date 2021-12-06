"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkInsert(
      "countries",
      [
        {
          name: "Indonesia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Japan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "South Korea",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Australia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
