const {Store, review} = require("../models");
const Sequelize = require('sequelize')

exports.register_rating = async (req, res) => {
  try {
    const result = await review.create({
      userId: req.user,
      store: req.body.store,
      star: req.body.rating
    })
  } catch (err) {
    console.error(err);
    next(err)
  }

}

exports.rating_AVG = async (req, res) => {

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