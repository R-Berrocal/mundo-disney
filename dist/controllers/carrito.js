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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarrito = exports.updateCarrito = exports.createCarrito = exports.getCarritoUserId = exports.getCarritoId = exports.getCarrito = void 0;
const models_1 = require("../models");
const getCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carrito = yield models_1.Carrito.findAll({
            where: { condition: true },
            include: [
                {
                    model: models_1.User
                },
                {
                    model: models_1.Movie
                }
            ]
        });
        return res.json({
            carrito,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.getCarrito = getCarrito;
const getCarritoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const carrito = yield models_1.Carrito.findByPk(id);
        if (!carrito) {
            return res.status(401).json({
                mgs: 'carrito not found',
            });
        }
        return res.json({
            carrito,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.getCarritoId = getCarritoId;
const getCarritoUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const carrito = yield models_1.Carrito.findAll({
            where: [{ userIduser: id }, { condition: true }],
            include: {
                model: models_1.Movie
            }
        });
        if (!carrito) {
            return res.status(401).json({
                mgs: 'carrito not found',
            });
        }
        return res.json({
            carrito,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.getCarritoUserId = getCarritoUserId;
const createCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const idUser = body.userIduser;
        const idMovie = body.movieIdmovie;
        const user = yield models_1.User.findByPk(idUser);
        const movie = yield models_1.Movie.findByPk(idMovie);
        if (!user) {
            return res.status(400).json({
                msg: `El id ${idUser} not exist in user / userIduser`,
            });
        }
        if (!movie) {
            return res.status(400).json({
                msg: `El id ${idMovie} not exist in movie / movieIdmovie`,
            });
        }
        const carrito = models_1.Carrito.build(body);
        yield carrito.save();
        return res.status(201).json({
            carrito,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.createCarrito = createCarrito;
const updateCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { idcarrito } = _a, resto = __rest(_a, ["idcarrito"]);
        const carrito = yield models_1.Carrito.findByPk(id);
        if (!carrito) {
            return res.status(400).json({
                msg: `Carrito not exist in db`,
            });
        }
        yield carrito.update(resto);
        return res.json({ carrito });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.updateCarrito = updateCarrito;
const deleteCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const carrito = yield models_1.Carrito.findByPk(id);
        if (!carrito) {
            return res.status(400).json({
                msg: `Carrito not exist in db`,
            });
        }
        yield carrito.destroy();
        res.json({
            carrito,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.deleteCarrito = deleteCarrito;
//# sourceMappingURL=carrito.js.map