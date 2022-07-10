"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate_fields");
const genre_1 = require("../controllers/genre");
const db_validator_1 = require("../helpers/db-validator");
const router = (0, express_1.Router)();
//Get Movies
router.get('/', genre_1.getGenres);
router.get('/:id', genre_1.getGender);
//Create Character
router.post('/', [(0, express_validator_1.check)('name', 'name is required').not().isEmpty().isLength({ max: 50 }).custom(db_validator_1.genreExist), validate_fields_1.validateFields], genre_1.createGenre);
router.put('/:id', genre_1.updateGenre);
router.delete('/:id', genre_1.deleteGenre);
exports.default = router;
//# sourceMappingURL=genre.js.map