const express = require("express");
const controller = require("../controller/Cstore");
const router = express.Router();

router.post('/star', controller.register_rating)
router.post('/register', controller.register)
router.patch('/Edit', controller.Edit)


module.exports = router;