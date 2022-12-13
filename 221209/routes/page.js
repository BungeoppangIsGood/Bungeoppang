const express = require("express");
//const controller = require("../controller/Cstore");
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/signup', (req, res) => {
  res.render('signup')
})
router.get('/main', (req, res) => {
  res.render('main')
})
router.get('/mypage', (req, res) => {
  console.log('req.user',req.user)
  res.render('mypage')
})


module.exports = router;