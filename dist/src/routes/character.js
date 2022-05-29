"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const character_1 = require("../controllers/character");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate_fields");
const router = (0, express_1.Router)();
//Get Characters
router.get("/", character_1.getCharacters);
router.get("/detail", character_1.getDetailsCharacter);
//Create Character
router.post("/", [
    (0, express_validator_1.check)("name", "name is required").not().isEmpty().isLength({ max: 50 }),
    validate_fields_1.validateFields
], character_1.createCharacter);
router.post("/detail", character_1.createDetail);
router.put("/:id", character_1.updateCharacter);
router.delete("/:id", character_1.deleteCharacter);
exports.default = router;
//# sourceMappingURL=character.js.map