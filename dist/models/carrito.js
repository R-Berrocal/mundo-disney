"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db/db_connection"));
const movie_1 = __importDefault(require("./movie"));
const user_1 = __importDefault(require("./user"));
const Carrito = db_connection_1.default.define("carrito", {
    idcarrito: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userIduser: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.default,
            key: 'iduser'
        },
        allowNull: false
    },
    movieIdmovie: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: movie_1.default,
            key: 'idmovie'
        },
        allowNull: false
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    tableName: "carrito"
});
exports.default = Carrito;
//# sourceMappingURL=carrito.js.map