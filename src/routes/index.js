const express = require("express");
const router = express.Router();

// controller
const {
  addUsers,
  getUsers,
  deleteUser,
  userLogin,
} = require("../controller/user");

const {
  addCountry,
  getCountry,
  deleteCountry,
  editCountry,
  getDetailCountry,
} = require("../controller/country");

router.post("/register", addUsers);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.post("/login", userLogin);

router.post("/country", addCountry);
router.get("/country", getCountry);
router.get("/country/:id", getDetailCountry);
router.delete("/country/:id", deleteCountry);
router.patch("/country/:id", editCountry);

module.exports = router;
