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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCharacter = exports.updateCharacter = exports.createCharacter = exports.getDetailsCharacter = exports.getCharacter = exports.getCharacters = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const getCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, weigh, movies } = req.query;
        let characters;
        if (name || age || weigh || movies) {
            characters = yield models_1.Character.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        {
                            name: {
                                [sequelize_1.Op.eq]: name,
                            },
                        },
                        {
                            age: {
                                [sequelize_1.Op.substring]: age,
                            },
                        },
                        {
                            weigh: {
                                [sequelize_1.Op.substring]: weigh,
                            },
                        },
                    ],
                },
                attributes: ['name', 'image', 'age', 'weigh', 'history'],
            });
            if (movies) {
                const moviesFilter = yield models_1.Movie.findAll({
                    where: {
                        idmovie: movies,
                    },
                    attributes: ['idmovie'],
                    include: {
                        attributes: ['name', 'image', 'age', 'weigh', 'history'],
                        model: models_1.Character,
                    },
                });
                return res.json({
                    characterMovies: moviesFilter,
                });
            }
            return res.json({
                characters,
            });
        }
        characters = yield models_1.Character.findAll({ include: { model: models_1.Movie } });
        return res.json({
            characters,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.getCharacters = getCharacters;
const getCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const character = yield models_1.Character.findByPk(id, {
            include: {
                model: models_1.Movie,
            },
        });
        if (!character) {
            return res.status(400).json({
                msg: `Character not exist in db`,
            });
        }
        return res.json({ character });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.getCharacter = getCharacter;
const getDetailsCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const details = yield models_1.Character.findAll({ include: { model: models_1.Movie } });
    res.json({
        details,
    });
});
exports.getDetailsCharacter = getDetailsCharacter;
const createCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const character = models_1.Character.build(body);
        const { idcharacter } = yield character.save();
        if (body.moviesId) {
            yield Promise.all(body.moviesId.map((movieIdmovie) => __awaiter(void 0, void 0, void 0, function* () {
                const movie = yield models_1.Movie.findByPk(movieIdmovie);
                if (!movie) {
                    return res.status(400).json({
                        msg: `El id ${movieIdmovie} not exist in movie`,
                    });
                }
                const movie_has_character = models_1.Movie_has_character.build({ movieIdmovie, characterIdcharacter: idcharacter });
                yield movie_has_character.save();
            })));
        }
        return res.status(201).json({
            character,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.createCharacter = createCharacter;
// //Para asignar id de peliculas existentes a personajes existentes
// export const createDetail = async (req: Request, res: Response) => {
//   try {
//     const { moviesId, characterIdcharacter } = req.body;
//     const character = await Character.findByPk(characterIdcharacter);
//     if (!character) {
//       return res.status(400).json({
//         msg: `El id ${characterIdcharacter} not exist in character`,
//       });
//     }
//     await Promise.all(
//       moviesId.map(async (movieIdmovie: any) => {
//         const movie = await Movie.findByPk(movieIdmovie);
//         if (!movie) {
//           return res.status(400).json({
//             msg: `El id ${movieIdmovie} not exist in movie`,
//           });
//         }
//         const movie_has_character = Movie_has_character.build({ movieIdmovie, characterIdcharacter });
//         await movie_has_character.save();
//       })
//     );
//     return res.status(201).json({
//       status: 'ok',
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: `Talk with admin`,
//     });
//   }
// };
const updateCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { idcharacter } = _a, resto = __rest(_a, ["idcharacter"]);
        const character = yield models_1.Character.findByPk(id);
        if (!character) {
            return res.status(400).json({
                msg: `Character not exist in db`,
            });
        }
        yield character.update(resto);
        return res.json({ character });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.updateCharacter = updateCharacter;
const deleteCharacter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const character = yield models_1.Character.findByPk(id);
        if (!character) {
            return res.status(400).json({
                msg: `Character not exist in db`,
            });
        }
        yield character.destroy();
        res.json({
            delete: character,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Talk with admin`,
        });
    }
});
exports.deleteCharacter = deleteCharacter;
//# sourceMappingURL=character.js.map