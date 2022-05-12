"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(process.env.DATABAS_NAME || "disney", "root", process.env.DATABASE_PASS, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: +process.env.DATABASE_PORT,
});
exports.default = db;
//# sourceMappingURL=db_connection.js.map