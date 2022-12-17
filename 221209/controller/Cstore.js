const {Store, review} = require("../models");
const Sequelize = require('sequelize')

exports.register_rating = async (req, res) => {
  console.log(req.body)
  const nickName = await User.findOne({
    attributes:['nickName'],
    where:{
      userId: req.user
    }
  })

  const result = await review.create({
    User_nickName: nickName,
    store: req.body.store,
    star: req.body.rating
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