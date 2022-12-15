const express = require("express");
const router = express.Router();
const {User} = require('../models')
const {Store} = require('../models')
const {Review} = require('../models')
const {Menu} = require('../models')
const Sequelize = require('sequelize')

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
  res.render('shopregister')
})



router.get('/storeDetail', async (req, res) => {

 const store = await Store.findOne({
    where: {
      storeName: req.query.store,
    },
    include: [{
      model: Menu,
      attributes: ['menuName', 'price']
    },{
      model: Review,
      attributes: ['User_nickName', 'star']
    }]
  })
  console.log(store.reviews) //review.dataValue로 접근


  const avg = await Review.findAll({
    attributes: [
      [Sequelize.fn('avg', Sequelize.col('star')), 'rating'],
    ],
    where: {
      store_id: store.dataValues.id,
    }
  });
  
  
  const data = {
    data:store.dataValues,
    menu1:store.menus[0].dataValues,
    menu2:store.menus[1].dataValues,
    avgRating:avg[0].dataValues.rating,
    ratinglist:store.reviews
  }
  
  res.render('shopdetail', data);
})

router.get('/storeEdit', async (req, res) => {
  console.log(req.query);//다양한 url모듈 써보기 
  const result = await Store.findOne({
    where:{storeName: req.query.store},
    include:{
      model: Menu,
      attributes: ['menuName', 'price']
    }
  })
  console.log(result.dataValues)
  console.log(result.menus[0].dataValues)
  console.log(result.menus[1].dataValues)
  const data = {
    data: result.dataValues,
    menu1: result.menus[0].dataValues,
    menu2: result.menus[1].dataValues,
  }

  res.render('shopedit', data);
})




router.get('/mypage', async (req, res) => {
  console.log('req.user',req.user)
  const result = await User.findOne({
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