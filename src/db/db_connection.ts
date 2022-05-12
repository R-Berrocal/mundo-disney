import {Sequelize} from 'sequelize';

const db= new Sequelize(process.env.DATABAS_NAME||"disney","root",process.env.DATABASE_PASS, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port:+process.env.DATABASE_PORT!,
  }
);

export default db