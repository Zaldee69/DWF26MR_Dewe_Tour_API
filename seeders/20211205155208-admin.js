"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkInsert(
      "users",
      [
        {
          fullName: "Admin",
          role: "admin",
          gender: "Male",
          email: "admin@gmail.com",
          password:
            "$2a$10$VYrBNksvrxwRvUfogkPNt.BMCHAuyQBs61UeqHV1QaqEXjzR6hKyy",
          address: "unknown",
          phone: "082254654721",
          createdAt: new Date(),
          updatedAt: new Date(),
          image: "dewe_tour/blank-profile-picture-973460_yqiiwe.png",
        },
        {
          fullName: "Muhammad Rizaldy",
          role: "admin",
          gender: "Male",
          email: "muhammadrizaldy60@gmail.com",
          password:
            "$2a$10$VYrBNksvrxwRvUfogkPNt.BMCHAuyQBs61UeqHV1QaqEXjzR6hKyy",
          address: "unknown",
          phone: "082254654721",
          createdAt: new Date(),
          updatedAt: new Date(),
          image: "dewe_tour/blank-profile-picture-973460_yqiiwe.png",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    // return queryInterface.bulkDelete("users", null, {});
  },
};
