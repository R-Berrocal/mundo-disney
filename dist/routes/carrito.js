"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate_fields");
const carrito_1 = require("../controllers/carrito");
const router = (0, express_1.Router)();
//Get Movies
router.get('/', carrito_1.getCarrito);
router.get('/:id', carrito_1.getCarritoId);
router.get('/user/:id', carrito_1.getCarritoUserId);
//Create Character
router.post('/', [
    (0, express_validator_1.check)('userIduser', 'userIduser is required').not().isEmpty(),
    (0, express_validator_1.check)('movieIdmovie', 'movieIdmovie is required').not().isEmpty(),
    validate_fields_1.validateFields
], carrito_1.createCarrito);
router.put('/:id', carrito_1.updateCarrito);
router.delete('/:id', carrito_1.deleteCarrito);
exports.default = router;
//# sourceMappingURL=carrito.js.map