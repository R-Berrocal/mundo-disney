import {Model,InferAttributes,InferCreationAttributes,CreationOptional} from 'sequelize';

export interface UserAttributes extends Model<InferAttributes<UserAttributes>,InferCreationAttributes<UserAttributes>>{
    iduser:number;
    name:string;
    email:string;
    password:string;
    condition:CreationOptional<boolean>;
}