const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../../../config/database')

const Log = sequelize.define("Log", {
    idBitacora: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombreUsuario: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    operacion: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
},{
    tableName: 'bitacora',
    timestamps: false,
})

module.exports = {
    Log
}