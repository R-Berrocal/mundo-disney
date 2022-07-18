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
        type: sequelize_1.DataTypes.TEXT,
    },
    creation_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    qualification: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 0
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT
    }
}, {
    tableName: "movie"
});
exports.default = Movie;
// Movie.sync({ alter: true });
//# sourceMappingURL=movie.js.map