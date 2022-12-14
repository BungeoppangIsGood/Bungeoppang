const {User} = require("../models");
const {Review} = require("../models");
const bcrypt = require('bcrypt')

//닉네임 수정
exports.nickName_update = (req, res) => {
  console.log(req.user)
  const result = User.update({
    nickName: req.body.nickName
  },{
    where: {userId : req.user}
  });
  console.log(result);
  res.send(result);
}


//마이페이지 프로필 수정
exports.mypage_update = async (req, res) => {
  console.log(req.body)
  if(req.body.pw){
    const hash = await bcrypt.hash(req.body.pw, 12);
    const result = await User.update({
      nickName: req.body.nickName,
      profileImg: req.body.profileImg,
      pw: hash
    },{
      where: {userId : req.user}
    });
    return res.send(result)
  } else {
    const result = await User.update({
      nickName: req.body.nickName,
      profileImg: req.body.profileImg,
    },{
      where: {userId : req.user}
    })
    res.send(result)
  }

}



//프로필 이미지 등록(수정)
exports.profileImg_update = (req, res) => {
  console.log(req.file)
  console.log(req.body)
  res.send(req.file.filename) 
}

exports.user_delete = async (req, res) => {
  console.log(req.user);
  const result = await User.destroy({
    where: {userId: req.user}
  })
  res.send('회원탈퇴성공');
}




