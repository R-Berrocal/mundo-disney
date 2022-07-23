"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db/db_connection"));
const carrito_1 = __importDefault(require("./carrito"));
const Orden = db_connection_1.default.define("orden", {
    idorden: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    carritoIdcarrito: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: carrito_1.default,
            key: 'idcarrito'
        },
        allowNull: false
    },
    total: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0
    },
    condition: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: "orden"
});
exports.default = Orden;
//# sourceMappingURL=orden.js.map