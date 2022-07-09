"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const db_validator_1 = require("../helpers/db-validator");
const validate_fields_1 = require("../middlewares/validate_fields");
const router = (0, express_1.Router)();
router.post("/login", auth_1.login);
router.post("/register", [
    (0, express_validator_1.check)("name", "name es required").not().isEmpty().isLength({ max: 50 }),
    (0, express_validator_1.check)("email", "email is required").not().isEmpty().isEmail(),
    (0, express_validator_1.check)("email").custom(db_validator_1.emailExist),
    (0, express_validator_1.check)("password", "password is required / must have more than 6 characters").isLength({ min: 6 }).not().isEmpty(),
    validate_fields_1.validateFields
], auth_1.register);
exports.default = router;
//# sourceMappingURL=auth.js.map