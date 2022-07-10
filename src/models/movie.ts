import { DataTypes } from 'sequelize';
import db from '../db/db_connection';
import MovieAttributes from '../interfaces/movie';

const Movie = db.define<MovieAttributes>(
  'movie',
  {
    idmovie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
        type:DataTypes.TEXT,
    },
    creation_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    qualification:{
        type:DataTypes.TINYINT,
        defaultValue:0
    },
    price:{
        type:DataTypes.FLOAT
    }
},{
    tableName:"movie"
})

export default Movie;
Movie.sync({ alter: true });
