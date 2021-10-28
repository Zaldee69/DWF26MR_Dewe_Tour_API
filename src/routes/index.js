const express = require("express");
const router = express.Router();

// controller
const {
  addUsers,
  getUsers,
  deleteUser,
  userLogin,
} = require("../controller/user");

router.post("/users", addUsers);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.post("/login", userLogin);

module.exports = router;
