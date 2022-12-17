const {Store, Review, User} = require("../models");
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
  console.log(req.body)
  const {storeName, address, operatingTime, menu, latitude, longitude} = req.body;
  console.log(menu.keys())
  const result = await Store.create({
    storeName,
    address,
    operatingTime
  })
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