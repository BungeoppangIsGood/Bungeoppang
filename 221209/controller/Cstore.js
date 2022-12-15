const {Store, review} = require("../models");
const Sequelize = require('sequelize')

exports.register_rating = async (req, res) => {
  const result = await review.create({
    userId: req.user,
    store: req.body.store,
    star: req.body.rating
  })
  res.send(result)
}

exports.register = async (req, res) => {
  const {storeName, address, operatingTime, menu} = req.body;
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