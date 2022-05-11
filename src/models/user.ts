import {DataTypes} from 'sequelize';
import db from '../db/db_connection';

const User = db.define("user_",{
    iduser_:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        
    },
    password_:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    condition:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
},{
    tableName:"user_"
});

// User.sync({alter:true})

export default User;