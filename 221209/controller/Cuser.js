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


//비번 수정
exports.password_update = async (req, res) => {
  const hash = await bcrypt.hash(req.body.pw, 12);
  const result = User.update({
    pw: hash
  },{
    where: {id : req.user}
  });
  res.send(result);
}



//프로필 이미지 등록(수정)
exports.profileImg_update = (req, res) => {
  console.log(req.file)
  console.log(req.body)
  res.send(req.file.filename) 
}




