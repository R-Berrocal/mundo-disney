import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize/types";


interface MovieAttributes extends Model<InferAttributes<MovieAttributes>,InferCreationAttributes<MovieAttributes>>{
    idmovie:number;
    image:CreationOptional<string>;
    title:string;
    description:string;
    creation_date:Date;
    price:number;
    qualification:CreationOptional<number>
}

export default MovieAttributes;