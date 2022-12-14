const express = require("express");
const router = express.Router();
const {User} = require('../models')

router.get('/signin', (req, res) => {
  console.log(req.user)
  res.render('signin')
})
router.get('/signup', (req, res) => {
  res.render('signup')
})
router.get('/main', (req, res) => {
  res.render('main')
})
router.get('/', (req, res) => {
  res.render('map')
})
router.get('/storeRegister', (req, res) => {
  res.render('shopRegister')
})
router.get('/storeDetail', (req, res) => {
  console.log(req.query)
  res.render('shopdetail')
})
router.get('/mypage', async (req, res) => {
  console.log('req.user',req.user)
  const result =  await User.findOne({
    where : {
      userId : req.user  
    }
  })
  if(!result) {
    const result = await User.fineOne({
      where: {
        snsId: req.user
      }
    })
    return res.render('mypage', {data: result});
  }
  console.log(result)
  res.render('mypage', {data: result})
})


module.exports = router;