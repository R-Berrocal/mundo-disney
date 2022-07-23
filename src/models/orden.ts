import { DataTypes } from "sequelize";
import db from "../db/db_connection";
import OrdenAttributes from "../interfaces/orden";
import Carrito from "./carrito";

const Orden = db.define<OrdenAttributes>("orden",{
    idorden:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    carritoIdcarrito:{
        type: DataTypes.INTEGER,
        references:{
            model:Carrito,
            key:'idcarrito'
        },
        allowNull:false
    },
    total:{
        type:DataTypes.FLOAT,
        defaultValue:0
    },
    condition: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
},{
    tableName:"orden"
});
export default Orden;