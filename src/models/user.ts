import { DataTypes } from 'sequelize';
import db from '../db/db_connection';
import UserAttributes from '../interfaces/user';

const User = db.define<UserAttributes>(
  'user_',
  {
    iduser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    condition: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: 'user_',
  }
);

export default User;
