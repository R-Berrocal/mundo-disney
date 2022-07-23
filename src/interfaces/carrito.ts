import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize/types';


interface CarritoAttributes extends Model<InferAttributes<CarritoAttributes>,InferCreationAttributes<CarritoAttributes>>{
    idcarrito:number;
    userIduser:number;
    movieIdmovie:number;
    cantidad:number;
    condition:boolean;
}

export default CarritoAttributes;