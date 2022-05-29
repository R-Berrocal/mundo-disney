"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = __importDefault(require("../db/db_connection"));
const Movie_has_genre = db_connection_1.default.define("movie_has_genre", {});
exports.default = Movie_has_genre;
//# sourceMappingURL=movie_has_genre.js.map