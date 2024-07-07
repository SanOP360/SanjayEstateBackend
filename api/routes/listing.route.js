const express = require("express");
const router = express.Router();
const { createListing,deleteListing, updateListing,getListing ,getListings} = require("../controllers/listing.controller");
const { verifyToken } = require("../utils/verifyUser");

router.post("/create", verifyToken, createListing);
router.post("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/getList/:id", getListing);
router.get('/get',getListings);

module.exports = router;
