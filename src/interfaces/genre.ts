import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize/types";


interface GenreAttributes extends Model<InferAttributes<GenreAttributes>,InferCreationAttributes<GenreAttributes>>{
    idgenre:number;
    name:string;
    image:CreationOptional<string>;
}

export default GenreAttributes;