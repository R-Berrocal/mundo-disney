"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_validator_1 = require("express-validator");
const validateFields = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    !error.isEmpty() ? res.status(400).json({ error }) : next();
};
exports.validateFields = validateFields;
//# sourceMappingURL=validate_fields.js.map