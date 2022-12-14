const express = require("express");
const controller = require("../controller/Cuser");
const router = express.Router();
const multer = require('multer');
const path =require('path');
const fs = require('fs');

router.patch('/nickNameUpdate', controller.nickName_update)
router.patch('/passwordUpdate', controller.password_update)




const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb){
			cb(null, 'uploads/');
		},
		filename(req, file, cb){
			const ext = path.extname(file.originalname);
			cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: {fileSize: 5*1024*1024}
})



router.patch('/profileImgUpdate', upload.single('profileImg'), controller.profileImg_update)


module.exports = router;

