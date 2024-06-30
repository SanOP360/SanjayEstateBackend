const express = require("express");
const router = express.Router();
const { updateUser } = require("../controllers/User.controller");
const { verifyToken } = require("../utils/verifyUser");

router.get("/test", (req, res) => res.json({ message: "Hello world" }));
router.post("/update/:id", verifyToken, updateUser);

module.exports = router;
