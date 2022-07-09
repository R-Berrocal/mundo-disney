"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = exports.Movie_has_character = exports.Movie = exports.Character = exports.User = void 0;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const character_1 = __importDefault(require("./character"));
exports.Character = character_1.default;
const movie_1 = __importDefault(require("./movie"));
exports.Movie = movie_1.default;
const movie_has_character_1 = __importDefault(require("./movie_has_character"));
exports.Movie_has_character = movie_has_character_1.default;
const genre_1 = __importDefault(require("./genre"));
exports.Genre = genre_1.default;
const movie_has_genre_1 = __importDefault(require("./movie_has_genre"));
movie_1.default.belongsToMany(genre_1.default, { through: movie_has_genre_1.default });
genre_1.default.belongsToMany(movie_1.default, { through: movie_has_genre_1.default });
movie_1.default.belongsToMany(character_1.default, { through: movie_has_character_1.default });
character_1.default.belongsToMany(movie_1.default, { through: movie_has_character_1.default });
//# sourceMappingURL=index.js.map