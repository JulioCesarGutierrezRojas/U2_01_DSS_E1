const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../../../config/database')
const { Rol } = require('./Rol')

const Person = sequelize.define('Person', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    contrasenia: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    telephone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:10,
            max:10
        }
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:1,
            max:2
        }
    },
    rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'usuarios',
    timestamps: false,
})

Person.belongsTo(Rol, { foreignKey: 'rol' })
Rol.hasMany(Person, { foreignKey: 'rol' })

module.exports = {
    Person
}