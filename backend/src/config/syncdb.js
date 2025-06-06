import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
import models from '../models/index.js';

const syncDB = async () => {
  try{
    await models.user.sync({ alter: true });
    await models.product.sync({ alter: true });
    await models.supplier.sync({ alter: true });
  } catch (error) {
    console.error('Unable to Sync database', error);
  }};

  export default syncDB;