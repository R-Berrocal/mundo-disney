import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

interface CharacterAttributes extends Model<InferAttributes<CharacterAttributes>,InferCreationAttributes<CharacterAttributes>>{
    idcharacter:number;
    image:CreationOptional<string>;
    name:string;
    age:number|string;
    weigh:CreationOptional<number|string>;
    history:CreationOptional<string>
}

export default CharacterAttributes