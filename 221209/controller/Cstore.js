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
  })//리뷰를 남기기위해서 id값 가져옴

 
  console.log(storeId);

  const result = await Review.create({
    User_nickName: nickName.dataValues.nickName,
    Store_id: storeId.dataValues.id,
    star: req.body.rating,
  })

  const avg = await Review.findAll({
    attributes: [[Sequelize.fn("avg", Sequelize.col("star")), "rating"]],
    where: {
      store_id: storeId.id,
    },
  });
  console.log(avg[0].dataValues.rating)

  const data = {
    nickName: nickName.nickName,
    rating: req.body.rating,
    ratingAVG: Number(avg[0].dataValues.rating).toFixed(1),
  }

  res.send(data)
}

exports.register = async (req, res) => {
  const {storeName, address, menu, operatingTime, lat, lon} = req.body;

  const userId = await User.findOne({
    attributes:['id'],
    where: {
      userId : req.user,
    }
  })

  const store = await Store.create({
    storeName,
    address,
    operatingTime,
    latitude : lat,
    longitude : lon,
    userId : userId.id
  })

  menu.forEach((el) => {
    el.Store_id = store.dataValues.id
  }) 
  console.log(store)
  const result2 = await Menu.bulkCreate(menu)
  res.send(store.storeName);
}

exports.Edit = async (req, res) => {
  console.log(req.body)
  const {storeName, address, menu, operatingTime, lat, lon} = req.body;
  //위도, 경도등도 넣어줘야한다.

  const store1 = await Store.update({
    storeName,
    address,
    operatingTime,
    latitude : lat,
    longitude : lon,
  },{
    where: {
      storeName: storeName
    }
  })


  const storeId = await Store.findOne({
    attributes: ['id'],
    where: {
      storeName: storeName
    }
  })//메뉴를 저장하려면 storeid를 알아야한다.

  const menuId = await Menu.findAll({
    attributes: ['id'],
    where:{
      store_id : storeId.id 
    }
  })//메뉴를 한 번에 수정하려면 menu의 id값들을 primary값을 알아야한다.

console.log(menuId)

  menu.forEach((el, i) => {
    el.id = menuId[i].id
  }) 

  const update= await Menu.bulkCreate(menu, {updateOnDuplicate: ['id']})

  res.send(store);
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