"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const UserAttributes = {
    iduser_: Number,
    email: String,
    password_: String,
};
class UserDto extends sequelize_1.Model {
}
exports.default = UserDto;
//# sourceMappingURL=user.js.map