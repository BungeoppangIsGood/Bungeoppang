const passport =require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User =require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {//인증과정을 통해 얻은 사용자 정보가 user로 들어간다.
    done(null, user.userId); //done한거를 deserializeUser에서 사용가능
  });

 
  passport.deserializeUser((id, done) => {
    // User.findOne({where: {id}})
    //   .then(user => {done(null, id)}) 
    //   //done되면 req.user로 정보접근가능해진다.
    //   //req.isAuthenticated()를 하면 true가 나온다.
    //   .catch(err => done(err));
      done(null, id)
  });

  local();
  kakao();
}

