const express = require("express");

const router = express.Router();

router.get("/send", (req, res) => {
    res.send("send massage endpoint");
})


module.exports = router;