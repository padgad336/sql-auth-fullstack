const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    'teach_tes', // name DB 
    'root', // user 
    '', //password
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql', // 'mysql' | 'mariadb' | 'postgres' | 'mssql'  
        define: {
            timestamps: false
        }
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("./models/user")(sequelize, Sequelize);


module.exports = db;