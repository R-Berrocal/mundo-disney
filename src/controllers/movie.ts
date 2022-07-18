import { Request, Response } from 'express';
import { Op } from 'sequelize';
import TypesQueryMovie from '../interfaces/typesQueryMovie';
import { Character, Genre, Movie, Movie_has_character } from '../models';
import Movie_has_genre from '../models/movie_has_genre';

export const getMovies = async (req: Request<unknown, unknown, unknown, TypesQueryMovie>, res: Response) => {
  try {
    const { name, genre, order } = req.query;
    let movie;
    if (name || genre || order) {
      movie = await Movie.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.eq]: name,
              },
            },
          ],
        },
        attributes: ['idmovie', 'image', 'title'],
      });

      if (genre) {
        const genreFilter = await Genre.findAll({
          where: {
            idgenre: genre,
          },
          attributes: ['idgenre'],
          include: {
            attributes: ['idmovie', 'image', 'title'],
            model: Movie,
          },
        });
        return res.json({
          moviesGenre: genreFilter,
        });
      }
      if (order) {
        const movieOr = await Movie.findAll({
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
    movie = await Movie.findAll();
    return res.json({
      movie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const getMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id, { include: { model: Character } });
    if (!movie) {
      return res.status(400).json({
        msg: `Movie not exist in db`,
      });
    }
    return res.json({ movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const getDetailsMovie = async (req: Request, res: Response) => {
  const detail = await Movie.findAll({ include: { model: Character } });
  return res.json({
    detail,
  });
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const movie = Movie.build(body);
    const { idmovie } = await movie.save();

    if(body.charactersId){
      await Promise.all(
        body.charactersId.map(async (characterIdcharacter: any) => {
          const character = await Character.findByPk(characterIdcharacter);
  
          if (!character) {
            return res.status(400).json({
              msg: `El id ${characterIdcharacter} not exist in character`,
            });
          }
          const movie_has_character = Movie_has_character.build({ movieIdmovie:idmovie, characterIdcharacter});
          await movie_has_character.save();
        })
      );
    }
    if(body.genresId){
      await Promise.all(
        body.genresId.map(async (genreIdgenre: any) => {
          const genre = await Genre.findByPk(genreIdgenre);
  
          if (!genre) {
            return res.status(400).json({
              msg: `El id ${genreIdgenre} not exist in genre`,
            });
          }
          const movie_has_genre = Movie_has_genre.build({ movieIdmovie:idmovie, genreIdgenre});
          await movie_has_genre.save();
        })
      );
    }
    return res.status(201).json({
      movie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

// export const createDetailMovies = async (req: Request, res: Response) => {
//   try {
//     const { movieIdmovie, genreIdgenre } = req.body;
//     const movie = await Movie.findByPk(movieIdmovie);
//     const genre = await Genre.findByPk(genreIdgenre);
//     if (!movie) {
//       return res.status(400).json({
//         msg: `El id ${movieIdmovie} not exist in movie`,
//       });
//     }
//     if (!genre) {
//       return res.status(400).json({
//         msg: `El id ${genreIdgenre} not exist in genre`,
//       });
//     }
//     const movie_has_genre = Movie_has_genre.build({ movieIdmovie, genreIdgenre });
//     await movie_has_genre.save();

//     return res.status(201).json({
//       movie_has_genre,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: `Talk with admin`,
//     });
//   }
// };

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { idmovie, ...resto } = req.body;

    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(400).json({
        msg: `Movie not exist in db`,
      });
    }

    await movie.update(resto);
    return res.json({ movie });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(400).json({
        msg: `Movie not exist in db`,
      });
    }

    await movie.destroy();
    res.json({
      delete: movie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Talk with admin`,
    });
  }
};
