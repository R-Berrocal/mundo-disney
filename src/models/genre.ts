import { DataTypes } from "sequelize";
import db from "../db/db_connection";
import GenreAttributes from "../interfaces/genre";

const Genre = db.define<GenreAttributes>("genre",{
    idgenre:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING
    },
    image:{
        type:DataTypes.STRING
    }
},{
    tableName:"genre"
});

export default Genre;

