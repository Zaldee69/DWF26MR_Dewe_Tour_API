const express = require("express");
const router = express.Router();

// controllers

const {
  getTransaction,
  addTransaction,
  editTransaction,
  getTransactionByUserID,
  getTransactionByID,
  getHistoryTransactions,
  approvementTransaction,
  getTransactionPending,
} = require("../controller/transaction");

const { getUsers, deleteUser, updateUser } = require("../controller/user");

const {
  addCountry,
  getCountry,
  deleteCountry,
  editCountry,
  getDetailCountry,
} = require("../controller/countries");

const { register, userLogin, checkAuth } = require("../controller/auth");

const {
  addTrip,
  getDetailTrip,
  getTrip,
  deleteTrip,
  editTrip,
} = require("../controller/trip");

const {
  addWishlist,
  getWishlist,
  deleteWishlist,
} = require("../controller/wishlist");

//middlewares
const { uploadFile } = require("../middlewares/uploadImage");
const { auth, adminOnly } = require("../middlewares/auth");

//auth routes
router.post("/register", register);
router.post("/login", userLogin);
router.get("/check-auth", auth, checkAuth);

// user routes
router.get("/users", getUsers);
router.patch("/users", auth, uploadFile("image"), updateUser);
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
router.patch("/trip/:id", auth, editTrip);
router.delete("/trip/:id", auth, adminOnly, deleteTrip);

//transaction routes
router.post("/transaction", auth, addTransaction);
router.get("/transactions", auth, adminOnly, getTransaction);
router.get("/transactions/pending", auth, adminOnly, getTransactionPending);
router.get("/transaction", auth, getTransactionByUserID);
router.get("/history-transactions", auth, getHistoryTransactions);
router.get("/user-transaction/:id", auth, adminOnly, getTransactionByID);
router.patch("/transaction/:id", auth, uploadFile("image"), editTransaction);
router.patch(
  "/transactions/admin/list-transaction/:id",
  auth,
  adminOnly,
  approvementTransaction
);

//wishlist routes
router.post("/wishlist", auth, addWishlist);
router.get("/wishlist", auth, getWishlist);
router.delete("/wishlist/:id", auth, deleteWishlist);

module.exports = router;
