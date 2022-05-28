import User from './user';
import Character from './character';
import Movie from './movie';
import Movie_has_character from './movie_has_character';
import Genre from './genre';
import Movie_has_genre from './movie_has_genre';

Movie.belongsToMany(Genre,{through:Movie_has_genre});
Genre.belongsToMany(Movie,{through:Movie_has_genre});

Movie.belongsToMany(Character, { through: Movie_has_character});
Character.belongsToMany(Movie, { through: Movie_has_character});

export {
    User,
    Character,
    Movie,
    Movie_has_character,
    Genre
}