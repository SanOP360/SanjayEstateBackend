const express = require("express");
const router = express.Router();
const { updateUser,deleteUser ,getUserListing} = require("../controllers/User.controller");
const { verifyToken } = require("../utils/verifyUser");

router.get("/test", (req, res) => res.json({ message: "Hello world" }));
router.post("/update/:id", verifyToken, updateUser);
router.post("/delete/:id", verifyToken, deleteUser);
router.get('/listing/:id',verifyToken,getUserListing)

module.exports = router;
