const Sequelize = require('sequelize');
 
class Store extends Sequelize.Model {

   static init(sequelize) {
 
      return super.init(
         {  
            name: {
               type: Sequelize.STRING(20),
               allowNull: false,
            },
            address: {
               type: Sequelize.STRING(100),
               allowNull: false,
               unique: true,
            },
            operatingTime: {
               type: Sequelize.STRING(7),
               allowNull: false,
            },
            latitude: {//위도
               type: Sequelize.INTEGER,
               allowNull: false
            },
            longitude: {//경도 
               type: Sequelize.INTEGER,
               allowNull: false
            }
         },
         {  // 두번째 객체 인수는 테이블 자체에 대한 설정
            sequelize, /* static init 메서드의 매개변수와 연결되는 옵션으로, db.sequelize 객체를 넣어야 한다. */
            modelName: 'store', /* 모델 이름을 설정. */
            tableName: 'store', /* 데이터베이스의 테이블 이름. */
            freezeTableName: true,
            timestamps: false,
            paranoid: false, /* true : deletedAt이라는 컬럼이 생기고 지운 시각이 기록된다. */
            charset: 'utf8', /* 인코딩 */
            collate: 'utf8_general_ci'
         }
      );
   }
   static associate(db) { // 인자로 index.js에서 만든 여러 테이블이 저장되어있는 db객체를 받을 것이다.
      db.Store.hasMany(db.Menu, { foreignKey: 'Store_id', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});
      db.Store.hasMany(db.Review, { foreignKey: 'Store_id', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});
      db.Store.belongsTo(db.User, { foreignKey: 'User_id', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});
   }

  
};
 
module.exports = Store;