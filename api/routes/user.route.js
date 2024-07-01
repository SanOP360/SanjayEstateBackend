const express = require("express");
const router = express.Router();
const { updateUser,deleteUser } = require("../controllers/User.controller");
const { verifyToken } = require("../utils/verifyUser");

router.get("/test", (req, res) => res.json({ message: "Hello world" }));
router.post("/update/:id", verifyToken, updateUser);
router.post("/delete/:id", verifyToken, deleteUser);

module.exports = router;
