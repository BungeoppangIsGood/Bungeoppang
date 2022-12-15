const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

router.post('/a', (req, res) => {
  console.log(req.body)
  res.send(true)
})

router.post('/signup', async (req, res, next) => { // 회원가입
  const {id, name, nickName, pw} = req.body;

  try {
    const exUser = await User.findOne({where: {userId: id}});
    if(exUser) {
      return res.send('존재하는 ID입니다.');
    }
    const hash = await bcrypt.hash(pw, 12);
    await User.create({
      userId: id,
      nickName,
      name,
      pw: hash
    });
    return res.send(true);
  } catch (error) {
    console.error(error);
    return next(error);
  }
})


router.post('/login', (req, res, next) => {

  passport.authenticate("local", (authError, user, info) => {
    if(authError) {
      console.error(authError);
      return next(authError);
    }
    if(!user) {
      return res.send(info.message)
    }
    return req.login(user, (loginError) => {
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      //console.log(user)
      return res.send(true);
    });
  })(req, res, next); //미들웨어 내에 미들웨어
})




router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', { //카카오 로그인 성공시에 카카오에서 요청을 해준다.
  failureRedirect: '/signin',
}), (req, res) => {
  res.redirect('/');
})


router.get('/facebook',passport.authenticate('facebook')); //사용자가 인증하러 - 내 서비스를 허락하러

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/signin' }),
  function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
}); 






router.get('/logout', (req, res) => {
  console.log(11)
  req.session.destroy(
    function(err){
      if(err) throw err;
      res.redirect('/login');
    }
  ); //세션자체파괴?
})


module.exports = router;