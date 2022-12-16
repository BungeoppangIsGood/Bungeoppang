const passport = require('passport');
const kakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {//생성자 함수로 만든 객체 넣는다. 안에 인자로 옵션, 함수등등?....
  passport.use(new kakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('kakao profile', profile);
    try {
      const exUser = await User.findOne({
        where: {snsId: profile.id, provider: 'kakao'},
      });
      if(exUser){
        done(null, exUser);
      } else {
        const newUser = await User.create({
          userId: '카카오'+profile._json.kakao_account.email,
          nickName: profile._json.properties.nickname,
          snsId: profile.id,
          provider: 'kakao',
          name: profile.username
        });
        done(null, newUser);
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }))
}