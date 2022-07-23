import { DataTypes } from "sequelize";
import db from "../db/db_connection";
import CarritoAttributes from "../interfaces/carrito";
import Movie from "./movie";
import User from "./user";

const Carrito = db.define<CarritoAttributes>("carrito",{
    idcarrito:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    userIduser:{
        type: DataTypes.INTEGER,
        references:{
            model:User,
            key:'iduser'
        },
        allowNull:false
    },
    movieIdmovie:{
        type:DataTypes.INTEGER,
        references:{
            model:Movie,
            key:'idmovie'
        },
        allowNull:false
    },
    cantidad:{
        type:DataTypes.INTEGER,
        defaultValue:1
    },
    condition: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
},{
    tableName:"carrito"
});
// Carrito.sync({alter:true})
export default Carrito;