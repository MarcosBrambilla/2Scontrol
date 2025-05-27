import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
import { User, Product, Supplier } from '../models/index.js';

const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_SERVER,
  dialect: 'postgres',
  port: process.env.PG_PORT,
  logging: console.log
});

const syncDB = async () => {
  await User.sync({ force: true });
  console.log('The table for the User model was just (re)created!');
  await Product.sync({ force: true });
  console.log('The table for the Product model was just (re)created!');
  await Supplier.sync({ force: true });
  console.log('The table for the Supplier model was just (re)created!');
}

export default sequelize;
export { syncDB, sequelize };