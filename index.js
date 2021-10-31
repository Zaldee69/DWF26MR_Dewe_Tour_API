const express = require("express");
const bp = require("body-parser");
require("dotenv").config();
// Get routes to the variabel
const router = require("./src/routes");

const app = express();
const port = 3000;
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// Add endpoint grouping and router
app.use("/api/v1/", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
