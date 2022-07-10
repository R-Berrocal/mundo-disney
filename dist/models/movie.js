"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db/db_connection"));
const Movie = db_connection_1.default.define('movie', {
    idmovie: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    creation_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    qualification: {
        type: sequelize_1.DataTypes.TINYINT,
<<<<<<< HEAD
        defaultValue: 0,
    },
=======
        defaultValue: 0
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT
    }
>>>>>>> 972c04b0381ecefe917e2ab6bc984a3e82e6c9cd
}, {
    tableName: 'movie',
});
exports.default = Movie;
//# sourceMappingURL=movie.js.map