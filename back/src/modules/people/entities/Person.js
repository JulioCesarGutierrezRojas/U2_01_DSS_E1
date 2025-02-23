const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../../../config/database')

const Person = sequelize.define('Person', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id_usuario',
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'nombre',
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'apellidos',
    },
    correo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isEmail: true
        },
        field: 'correo',
    },
    contrasenia: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'contrasenia',
    },
    telefono: {
        type: DataTypes.STRING(10),
        allowNull: false,
        field: 'telefono',
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 100,
        },
        field: 'edad',
    },
    rol: {
        type: DataTypes.ENUM('usuario', 'admin'),
        allowNull: false,
        field: 'rol',
    }
},{
    tableName: 'usuarios',
    timestamps: false,
})

module.exports = {
    Person
}