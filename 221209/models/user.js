const Sequelize = require('sequelize');
 
class User extends Sequelize.Model {

   static init(sequelize) {
 
      return super.init(
         {  

            userId: {
               type: Sequelize.STRING(50),
               allowNull: false,
               unique:true,
            },
            name: {
               type: Sequelize.STRING(10),
               allowNull: false,
            },
            pw: {
               type: Sequelize.STRING(100),
               allowNull: true,
            },
            provider: {
               type: Sequelize.STRING(10),
               allowNull: false, 
               defaultValue: 'local'
            },
            snsId: {
               type: Sequelize.STRING(30),
               allowNull: true, 
            },
            nickName: {
               type: Sequelize.STRING(20),
               allowNull: false,
               unique: true,
            },
            profileImg: {
               type: Sequelize.STRING,
               allowNull: false, 
               defaultValue: 'defaultImg'
            },
         },
         {  // 두번째 객체 인수는 테이블 자체에 대한 설정
            sequelize, /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */
            modelName: 'user', /* 모델 이름을 설정. */
            tableName: 'user', /* 데이터베이스의 테이블 이름. */
            freezeTableName: true,
            timestamps: false,
            paranoid: false, /* true : deletedAt이라는 컬럼이 생기고 지운 시각이 기록된다. */
            charset: 'utf8', /* 인코딩 */
            collate: 'utf8_general_ci'
         }
      );
   }
   static associate(db) { // 인자로 index.js에서 만든 여러 테이블이 저장되어있는 db객체를 받을 것이다.    
      db.User.hasMany(db.Store, { foreignKey: 'User_id', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});      
      db.User.hasMany(db.Review, { foreignKey: 'User_nickName', sourceKey: 'nickName', onDelete: 'cascade', onUpdate: 'cascade'});      
   }
};
 
module.exports = User;