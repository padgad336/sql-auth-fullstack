const { Sequelize } = require("sequelize");
import config from 'config';
console.log(
    `${config.get('db.NAME')}`, 
    `${config.get('db.USER')}`, 
    `${config.get('db.PASSWORD')}`,
);
const sequelize = new Sequelize(
    `${config.get('db.NAME')}`, // name DB 
    `${config.get('db.USER')}`, // user 
    `${config.get('db.PASSWORD')}`, //password
    {
        host: `${config.get('db.HOST')}`,
        port: `${config.get('db.PORT')}`,
        dialect: `${config.get('db.dialect')}`, // 'mysql' | 'mariadb' | 'postgres' | 'mssql'  
        define: {
            timestamps: false
        }
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("./models/user")(sequelize, Sequelize);


module.exports = db;