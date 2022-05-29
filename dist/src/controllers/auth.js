"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const generate_token_1 = require("../helpers/generate_token");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ where: { email } });
        //validacion del email
        if (!(user === null || user === void 0 ? void 0 : user.email)) {
            return res.status(400).json({
                msg: `User / password wrong -  email`
            });
        }
        //validacion del user.condition
        if (!user.condition) {
            return res.status(400).json({
                msg: `User / password  wrong - condition: false`
            });
        }
        //validacion password
        const validPasswrod = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPasswrod) {
            return res.status(400).json({
                msg: `User / password  wrong - password`
            });
        }
        const token = yield (0, generate_token_1.generateToken)(user.iduser);
        return res.json({
            user,
            token
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: `talk to the administrator`
        });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const user = user_1.default.build(body);
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(body.password, salt);
        yield user.save();
        return res.status(201).json({
            user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "hable con el administrador"
        });
    }
});
exports.register = register;
//# sourceMappingURL=auth.js.map