"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_1 = require("../controllers/movie");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate_fields");
const router = (0, express_1.Router)();
//Get Movies
router.get("/", movie_1.getMovies);
router.get("/detail", movie_1.getDetailsMovie);
//Create Character
router.post("/", [
    (0, express_validator_1.check)("title", "title is required").not().isEmpty().isLength({ max: 50 }),
    validate_fields_1.validateFields
], movie_1.createMovie);
router.post("/detail", [
    (0, express_validator_1.check)("movieIdmovie", "id movie is required").not().isEmpty(),
    (0, express_validator_1.check)("genreIdgenre", "id genre is required").not().isEmpty(),
    validate_fields_1.validateFields
], movie_1.createDetailMovies);
router.put("/:id", movie_1.updateMovie);
router.delete("/:id", movie_1.deleteMovie);
exports.default = router;
//# sourceMappingURL=movie.js.map