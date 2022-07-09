import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize/types';

interface MovieAttributes extends Model<InferAttributes<MovieAttributes>, InferCreationAttributes<MovieAttributes>> {
  idmovie: number;
  price: number;
  image: CreationOptional<string>;
  description: CreationOptional<string>;
  title: string;
  creation_date: Date;
  qualification: CreationOptional<number>;
}

export default MovieAttributes;
