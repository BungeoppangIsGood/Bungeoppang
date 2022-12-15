const express = require("express");
const controller = require("../controller/Cuser");
const router = express.Router();
const multer = require('multer');
const path =require('path');
const fs = require('fs');


const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb){
			cb(null, 'uploads/');
		},
		filename(req, file, cb){ 
			const ext = path.extname(file.originalname);
			cb(null, path.basename(Buffer.from(file.originalname, 'latin1'). toString('utf8'), ext) + Date.now() + ext);
		},
	}),
	limits: {fileSize: 5*1024*1024}
})



router.patch('/profileImgUpdate', upload.single('profileImg'), controller.profileImg_update)
router.patch('update', controller.mypage_update)

module.exports = router;

