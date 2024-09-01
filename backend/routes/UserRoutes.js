const express = require("express");
const router = express.Router();
const {register, login, getAllUsers} = require("../controllers/UserController");

router.post("/register", register);
router.post("/login", login);
router.get("/getAllUsers",getAllUsers)

module.exports = router;  