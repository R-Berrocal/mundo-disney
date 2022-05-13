import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

interface CharacterAttributes extends Model<InferAttributes<CharacterAttributes>,InferCreationAttributes<CharacterAttributes>>{
    idcharacter:number;
    image:CreationOptional<string>;
    name:string;
    age:number;
    weigh:CreationOptional<number>;
    history:CreationOptional<string>
}

export default CharacterAttributes