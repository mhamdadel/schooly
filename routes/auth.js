const express = require("express");
const { signin, signup, signout } = require("../controllers/auth.js");
const auth = require("../middleware/auth.js");
const unAuth = require("../middleware/unAuth.js");
const router = express.Router();

router.post("/register", unAuth, signup);
router.post("/login", unAuth, signin);
router.get("/logout", auth, signout);

module.exports = router;
