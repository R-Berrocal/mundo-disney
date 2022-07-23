"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate_fields");
const orden_1 = require("../controllers/orden");
const router = (0, express_1.Router)();
//Get Movies
router.get('/', orden_1.getOrden);
router.get('/:id', orden_1.getOrdenId);
router.get('/carrito/:id', orden_1.getOrdenCarritoId);
//Create Character
router.post('/', [
    (0, express_validator_1.check)('carritoIdcarrito', 'carritoIdcarrito is required').not().isEmpty(),
    validate_fields_1.validateFields
], orden_1.createOrden);
router.put('/:id', orden_1.updateOrden);
router.delete('/:id', orden_1.deleteOrden);
exports.default = router;
//# sourceMappingURL=orden.js.map