import { Request, Response } from 'express';
import { Op } from 'sequelize';
import TypesQueryCharacter from '../interfaces/typesQueryCharacter';
import { Character, Movie, Movie_has_character } from '../models';

export const getCharacters = async (req: Request<unknown, unknown, unknown, TypesQueryCharacter>, res: Response) => {
  try {
    const { name, age, weigh, movies } = req.query;
    let characters;
    if (name || age || weigh || movies) {
      characters = await Character.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.eq]: name,
              },
            },
            {
              age: {
                [Op.substring]: age,
              },
            },
            {
              weigh: {
                [Op.substring]: weigh,
              },
            },
          ],
        },
        attributes: ['name', 'image', 'age', 'weigh', 'history'],
      });

      if (movies) {
        const moviesFilter = await Movie.findAll({
          where: {
            idmovie: movies,
          },
          attributes: ['idmovie'],
          include: {
            attributes: ['name', 'image', 'age', 'weigh', 'history'],
            model: Character,
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
    characters = await Character.findAll({include:{model:Movie}});
    return res.json({
      characters,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const getCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const character = await Character.findByPk(id, {
      include: {
        model: Movie,
      },
    });
    if (!character) {
      return res.status(400).json({
        msg: `Character not exist in db`,
      });
    }
    return res.json({ character });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const getDetailsCharacter = async (req: Request, res: Response) => {
  const details = await Character.findAll({ include: { model: Movie } });
  res.json({
    details,
  });
};

export const createCharacter = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const character = Character.build(body);
    const { idcharacter } = await character.save();

    if(body.moviesId){
      await Promise.all(
        body.moviesId.map(async (movieIdmovie: any) => {
          const movie = await Movie.findByPk(movieIdmovie);
  
          if (!movie) {
            return res.status(400).json({
              msg: `El id ${movieIdmovie} not exist in movie`,
            });
          }
          const movie_has_character = Movie_has_character.build({ movieIdmovie, characterIdcharacter: idcharacter });
          await movie_has_character.save();
        })
      );
    }
    

    return res.status(201).json({
      character,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

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

export const updateCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { idcharacter, ...resto } = req.body;

    const character = await Character.findByPk(id);
    if (!character) {
      return res.status(400).json({
        msg: `Character not exist in db`,
      });
    }

    await character.update(resto);
    return res.json({ character });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const deleteCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const character = await Character.findByPk(id);
    if (!character) {
      return res.status(400).json({
        msg: `Character not exist in db`,
      });
    }

    await character.destroy();
    res.json({
      delete: character,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};
