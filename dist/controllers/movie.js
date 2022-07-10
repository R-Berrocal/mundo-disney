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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.createDetailMovies = exports.createMovie = exports.getDetailsMovie = exports.getMovie = exports.getMovies = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const movie_has_genre_1 = __importDefault(require("../models/movie_has_genre"));
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, genre, order } = req.query;
        let movie;
        if (name || genre || order) {
            movie = yield models_1.Movie.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        {
                            title: {
                                [sequelize_1.Op.eq]: name,
                            },
                        },
                    ],
                },
                attributes: ['idmovie', 'image', 'title'],
            });
            if (genre) {
                const genreFilter = yield models_1.Genre.findAll({
                    where: {
                        idgenre: genre,
                    },
                    attributes: ['idgenre'],
                    include: {
                        attributes: ['idmovie', 'image', 'title'],
                        model: models_1.Movie,
                    },
                });
                return res.json({
                    moviesGenre: genreFilter,
                });
            }
            if (order) {
                const movieOr = yield models_1.Movie.findAll({
                    order: [['title', order.toUpperCase()]],
                    attributes: ['idmovie', 'image', 'title'],
                });
                return res.json({
                    movies: movieOr,
                });
            }
            return res.json({
                movie,
            });
        }
        movie = yield models_1.Movie.findAll();
        return res.json({
            movie,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.getMovies = getMovies;
const getMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const movie = yield models_1.Movie.findByPk(id, { include: { model: models_1.Character } });
        if (!movie) {
            return res.status(400).json({
                msg: `Movie not exist in db`,
            });
        }
        return res.json({ movie });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.getMovie = getMovie;
const getDetailsMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detail = yield models_1.Movie.findAll({ include: { model: models_1.Character } });
    return res.json({
        detail,
    });
});
exports.getDetailsMovie = getDetailsMovie;
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const movie = models_1.Movie.build(body);
        yield movie.save();
        return res.status(201).json({
            movie,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.createMovie = createMovie;
const createDetailMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movieIdmovie, genreIdgenre } = req.body;
        const movie = yield models_1.Movie.findByPk(movieIdmovie);
        const genre = yield models_1.Genre.findByPk(genreIdgenre);
        if (!movie) {
            return res.status(400).json({
                msg: `El id ${movieIdmovie} not exist in movie`,
            });
        }
        if (!genre) {
            return res.status(400).json({
                msg: `El id ${genreIdgenre} not exist in genre`,
            });
        }
        const movie_has_genre = movie_has_genre_1.default.build({ movieIdmovie, genreIdgenre });
        yield movie_has_genre.save();
        return res.status(201).json({
            movie_has_genre,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.createDetailMovies = createDetailMovies;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { idmovie } = _a, resto = __rest(_a, ["idmovie"]);
        const movie = yield models_1.Movie.findByPk(id);
        if (!movie) {
            return res.status(400).json({
                msg: `Movie not exist in db`,
            });
        }
        yield movie.update(resto);
        return res.json({ movie });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const movie = yield models_1.Movie.findByPk(id);
        if (!movie) {
            return res.status(400).json({
                msg: `Movie not exist in db`,
            });
        }
        yield movie.destroy();
        res.json({
            delete: movie,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.deleteMovie = deleteMovie;
//# sourceMappingURL=movie.js.map