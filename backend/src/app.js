import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import corsOptions from './middlewares/cors.js';
import syncDB from './config/syncdb.js';
import sequelize from './config/database.js';
import { authRoutes, productsRoutes, suppliersRoutes } from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const app = express();
const PORT = 5000;

//midlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/suppliers', suppliersRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has to the database been established.');

        await syncDB();
        console.log('Database has been successfully sincronized.');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database and start server:', error.original);
    }
};

startServer();

