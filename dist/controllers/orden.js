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
exports.deleteOrden = exports.updateOrden = exports.createOrden = exports.getOrdenCarritoId = exports.getOrdenId = exports.getOrden = void 0;
const models_1 = require("../models");
const getOrden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orden = yield models_1.Orden.findAll({
            where: { condition: true },
            include: [
                {
                    model: models_1.Carrito,
                    include: [{ model: models_1.Movie }, { model: models_1.User }]
                }
            ]
        });
        return res.json({
            orden,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.getOrden = getOrden;
const getOrdenId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const orden = yield models_1.Orden.findByPk(id, {
            include: [
                {
                    model: models_1.Carrito,
                    include: [{ model: models_1.Movie }, { model: models_1.User }]
                }
            ]
        });
        if (!orden) {
            return res.status(401).json({
                mgs: 'orden not found',
            });
        }
        return res.json({
            orden,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.getOrdenId = getOrdenId;
const getOrdenCarritoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const orden = yield models_1.Orden.findAll({
            where: { carritoIdcarrito: id },
            include: {
                model: models_1.Carrito,
                include: [{ model: models_1.Movie }, { model: models_1.User }]
            }
        });
        if (!orden) {
            return res.status(401).json({
                mgs: 'orden not found',
            });
        }
        return res.json({
            orden,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.getOrdenCarritoId = getOrdenCarritoId;
const createOrden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const idCarrito = body.carritoIdcarrito;
        const carrito = yield models_1.Carrito.findByPk(idCarrito);
        if (!carrito) {
            return res.status(400).json({
                msg: `El id ${idCarrito} not exist in carrito / carritoIdcarrito`,
            });
        }
        yield carrito.update({ condition: false });
        const orden = models_1.Orden.build(body);
        yield orden.save();
        return res.status(201).json({
            orden,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.createOrden = createOrden;
const updateOrden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { idorden } = _a, resto = __rest(_a, ["idorden"]);
        const orden = yield models_1.Orden.findByPk(id);
        if (!orden) {
            return res.status(400).json({
                msg: `Orden not exist in db`,
            });
        }
        yield orden.update(resto);
        return res.json({ orden });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.updateOrden = updateOrden;
const deleteOrden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const orden = yield models_1.Orden.findByPk(id);
        if (!orden) {
            return res.status(400).json({
                msg: `Orden not exist in db`,
            });
        }
        yield orden.destroy();
        res.json({
            orden,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.deleteOrden = deleteOrden;
//# sourceMappingURL=orden.js.map