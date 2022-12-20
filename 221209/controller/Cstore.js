const {Store, Review, User, Menu} = require("../models");
const Sequelize = require('sequelize')

exports.register_rating = async (req, res) => {
  console.log(req.user);
  console.log(req.body);
  const nickName = await User.findOne({
    attributes:['nickName'],
    where:{
      userId: req.user
    }
  })
  const storeId = await Store.findOne({
    attributes:['id'],
    where:{
      storeName: req.body.store 
    }
  })
  console.log(storeId);
  
  const result = await Review.create({
    User_nickName: nickName.dataValues.nickName,
    Store_id: storeId.dataValues.id,
    star: req.body.rating,

  })
  res.send(result)
}

exports.register = async (req, res) => {
  const {storeName, address, menu, operatingTime} = req.body;
  const latitude = 123
  const longitude = 123

  const userId = await User.findOne({
    attributes:['id'],
    where: {
      userId : req.user,
    }
  })
  console.log(userId.id)
  const store = await Store.create({
    storeName,
    address,
    operatingTime,
    latitude,
    longitude,
    userId : userId.id
  })

  menu.forEach((el) => {
    el.Store_id = store.dataValues.id
  }) 
  console.log(menu)
  const result2 = await Menu.bulkCreate(menu)
  res.send('등록성공');
}

//가게 페이지 render시에 필요
// async function a(){
//   const result = await Review.findAll({
//     attributes: [
//       [Sequelize.fn('avg', Sequelize.col('star')), 'rating'],
//     ],
//     where: {
//       store_id: 1,
//     }
//   });
//   console.log(result)
// }a()