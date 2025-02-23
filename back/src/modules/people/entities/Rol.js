const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../../../config/database')

const Rol = sequelize.define('Rol', {
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombreRol: {
        type: DataTypes.ENUM('usuario', 'admin'),
        allowNull: false
    }
},{
    tableName: 'rol',
    timestamps: false,
})

module.exports = {
    Rol
}