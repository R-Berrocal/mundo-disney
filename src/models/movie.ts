import { DataTypes } from "sequelize";
import db from "../db/db_connection";
import MovieAttributes from "../interfaces/movie";

const Movie = db.define<MovieAttributes>("movie",{
    idmovie:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    creation_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    qualification:{
        type:DataTypes.TINYINT,
        defaultValue:0
    }
},{
    tableName:"movie"
})

export default Movie;