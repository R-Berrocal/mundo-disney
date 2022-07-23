import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize/types';


interface OrdenAttributes extends Model<InferAttributes<OrdenAttributes>,InferCreationAttributes<OrdenAttributes>>{
    idorden:number;
    carritoIdcarrito:number;
    total:number;
    condition:boolean;
}

export default OrdenAttributes;