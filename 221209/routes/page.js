const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { Store } = require("../models");
const { Review } = require("../models");
const { Menu } = require("../models");
const Sequelize = require("sequelize");
const {isLoggedIn} = require('./middlewares')
const Op = Sequelize.Op;

router.get("/signin", (req, res) => {
  console.log(req.user);
  res.render("signin");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/main", (req, res) => {
  res.render("main");
});
router.get("/", (req, res) => {
  res.render("main");
});
router.get("/map", (req, res) => {
  res.render("map");
});
router.get("/storeRegister", isLoggedIn, (req, res) => {
  res.render("shopregister");
});
router.get("/storeMap", (req, res) => {
  res.render("shopmap");
});

router.get("/storeDetail", async (req, res, next) => {
  try {
    const store = await Store.findOne({
      where: {
        storeName: req.query.store,
      },
      include: [
        {
          model: Menu,
          attributes: ["menuName", "price"],
        },
        {
          model: Review,
          attributes: ["User_nickName", "star"],
        },
      ],
    });
    //console.log(store);
  
    const avg = await Review.findAll({
      attributes: [[Sequelize.fn("avg", Sequelize.col("star")), "rating"]],
      where: {
        store_id: store.id,
      },
    });
    console.log(avg[0].dataValues.rating)

    
    const data = {
      data: store.dataValues,
      menu1: store.menus[0]?.dataValues || null,
      menu2: store.menus[1]?.dataValues || null,
      ratingAVG: Number(avg[0].dataValues.rating).toFixed(1),
      ratinglist: store.reviews || 0,
    };

    res.render("shopdetail", data); 
  } catch (err) {
    console.error(err);
    next(err)
  }
  

});

router.get("/storeEdit", async (req, res) => {
  console.log(req.query); //다양한 url모듈 써보기
  const result = await Store.findOne({
    where: { storeName: req.query.store },
    include: {
      model: Menu,
      attributes: ["menuName", "price"],
    },
  });
  console.log(result.dataValues);
  console.log(result.menus[0].dataValues);
  console.log(result.menus[1].dataValues);
  const data = {
    data: result.dataValues,
    menu1: result.menus[0].dataValues,
    menu2: result.menus[1].dataValues,
  };

  res.render("shopedit", data);
});

router.get("/mypage", isLoggedIn, async (req, res) => {
  console.log("req.user", req.user);
  const result = await User.findOne({
    where: {
      userId: req.user,
    },
  });
  if (!result) {
    const result = await User.fineOne({
      where: {
        snsId: req.user,
      },
    });
    return res.render("mypage", { data: result });
  }
  console.log(result);
  res.render("mypage", { data: result });
});

router.post("/storeList", async (req, res) => {
  const { northEast, southWest } = req.body;
  const x1 = southWest.lon;
  const y1 = southWest.lat;
  const x2 = northEast.lon;
  const y2 = northEast.lat;
  console.log(req.body);

  const result = await Store.findAll({
    attributes: ["id", "storeName", "address", "latitude", "longitude"],
    where: {
      [Op.and]: [
        {
          longitude: { [Op.between]: [x1, x2] },
        },
        {
          latitude: { [Op.between]: [y1, y2] },
        },
      ],
    },
  });
  console.log(result);
  res.send(result);
});
module.exports = router;
