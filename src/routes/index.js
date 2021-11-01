const express = require("express");
const router = express.Router();

// controllers

const {
  getDetailsTransaction,
  getTransaction,
  addTransaction,
  editTransaction,
} = require("../controller/transaction");

const { getUsers, deleteUser } = require("../controller/user");

const {
  addCountry,
  getCountry,
  deleteCountry,
  editCountry,
  getDetailCountry,
} = require("../controller/countries");

const { register, userLogin } = require("../controller/auth");

const {
  addTrip,
  getDetailTrip,
  getTrip,
  deleteTrip,
  editTrip,
} = require("../controller/trip");

//middlewares
const { uploadFile } = require("../middlewares/uploadImage");
const { auth, adminOnly } = require("../middlewares/auth");

//auth routes
router.post("/register", register);
router.post("/login", userLogin);

// user routes
router.get("/users", getUsers);
router.get("/users", getUsers);
router.delete("/users/:id", auth, adminOnly, deleteUser);

//country routes
router.post("/country", auth, adminOnly, addCountry);
router.get("/country", getCountry);
router.get("/country/:id", getDetailCountry);
router.delete("/country/:id", auth, adminOnly, deleteCountry);
router.patch("/country/:id", auth, adminOnly, editCountry);

//trip routes
router.post("/trip", uploadFile("image"), auth, adminOnly, addTrip);
router.get("/trip", getTrip);
router.get("/trip/:id", getDetailTrip);
router.patch("/trip/:id", auth, adminOnly, editTrip);
router.delete("/trip/:id", auth, adminOnly, deleteTrip);

//transaction routes
router.post("/transaction", auth, addTransaction);
router.get("/transaction", auth, getTransaction);
router.get("/transaction/:id", auth, getDetailsTransaction);
router.patch("/transaction/:id", adminOnly, auth, editTransaction);

module.exports = router;
