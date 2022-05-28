import User from './user';
import Character from './character';
import Movie from './movie';
import Movie_has_character from './movie_has_character';

Movie.belongsToMany(Character, { through: Movie_has_character});
Character.belongsToMany(Movie, { through: Movie_has_character});

export {
    User,
    Character,
    Movie,
    Movie_has_character
}