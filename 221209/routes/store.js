const express = require("express");
const controller = require("../controller/Cstore");
const router = express.Router();

router.post('/rating', controller.register_rating)
router.post('/register', controller.register)


module.exports = router;