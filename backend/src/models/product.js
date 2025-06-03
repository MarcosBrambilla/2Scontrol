import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true
});

export default product;