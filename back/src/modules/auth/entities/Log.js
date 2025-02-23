const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../../../config/database')

const Log = sequelize.define("Log", {
    idBitacora: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id_bitacora',
    },
    nombreUsuario: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'nombre_usuario',
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'fecha',
    },
    operacion: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: 'operacion',
    },
},{
    tableName: 'bitacora',
    timestamps: false,
})

module.exports = {
    Log
}