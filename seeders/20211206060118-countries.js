"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
    return queryInterface.bulkInsert(
      "countries",
      [
        {
          name: "Indonesia",
        },
        {
          name: "Australia",
        },
        {
          name: "Japan",
        },
        {
          name: "South Korea",
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
