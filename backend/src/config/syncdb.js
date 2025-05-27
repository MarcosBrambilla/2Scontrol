import dotenv from 'dotenv';
dotenv.config({path: '../.env'});
import models from '../models/index.js';

const syncDB = async () => {
    await models.User.sync({ alter: true });
    console.log('The table for the User model was just (re)created!');
    await models.Product.sync({ alter: true });
    console.log('The table for the Product model was just (re)created!');
    await models.Supplier.sync({ alter: true });
    console.log('The table for the Supplier model was just (re)created!');
  }

  export default syncDB;