const express = require("express");
const controller = require("../controller/Cuser");
const router = express.Router();

router.patch('/nickNameUpdate', controller.nickName_update)
router.patch('/passwordUpdate', controller.password_update)


module.exports = router;

