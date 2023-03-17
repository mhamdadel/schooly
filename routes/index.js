const express = require("express");
const router = express.Router();

router.use("/users", require("./user"));
router.use("/auth", require("./auth"));
router.get("/", (req, res) => {
    res.status(200).json({
        status: res.statusCode,
        message: "this is home page",
    });
});

module.exports = router;
