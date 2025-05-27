import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});

const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_SERVER,
  dialect: 'postgres',
  port: process.env.PG_PORT,
});

export default sequelize;