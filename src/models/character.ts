import db from '../db/db_connection';
import { DataTypes } from 'sequelize';
import CharacterAttributes from '../interfaces/character';


const Character = db.define<CharacterAttributes>("character_",{
    idcharacter: {
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    weigh:{
        type:DataTypes.INTEGER
    },
    history:{
        type:DataTypes.TEXT,
        allowNull:true
    }

},{
    tableName:"character_"
})


export default Character