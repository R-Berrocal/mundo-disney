"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = __importDefault(require("../db/db_connection"));
const sequelize_1 = require("sequelize");
const Character = db_connection_1.default.define("character_", {
    idcharacter: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    weigh: {
        type: sequelize_1.DataTypes.INTEGER
    },
    history: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "character_"
});
exports.default = Character;
//# sourceMappingURL=character.js.map