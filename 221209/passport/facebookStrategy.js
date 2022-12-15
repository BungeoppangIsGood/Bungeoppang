const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user');

module.exports = () => {//생성자 함수로 만든 객체 넣는다. 안에 인자로 옵션, 함수등등?....
  passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    profileFields: ['id', 'emails', 'name', 'displayName'],
    callbackURL: '/auth/facebook/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('facebook profile', profile);
    try {
      const exUser = await User.findOne({
        where: {snsId: profile.id, provider: 'facebook'},
      });
      if(exUser){
        done(null, exUser);
      } else {
        const newUser = await User.create({
          userId: profile._json.email,
          nickName: profile._json.email.split('@')[0],
          snsId: profile._json.email,
          provider: 'facebook',
          name: profile.displayName
        });
        done(null, newUser);
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }))
}