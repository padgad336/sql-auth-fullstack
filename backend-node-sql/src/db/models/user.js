import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt'

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define(
        'user',
        {
            pid: { type: Sequelize.INTEGER(11), primaryKey: true, autoIncrement: true, field: 'pid' },
            name: { type: Sequelize.STRING(50), allowNull: false, field: 'name' },
            username: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    // We require usernames to have length of at least 3, and
                    // only use letters, numbers and underscores.
                    is: /^\w{3,}$/
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            tableName: 'user',

        }
    );

    return user;
}