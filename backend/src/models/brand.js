import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import product from './product.js';

const brand = sequelize.define('brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, { timestamps: true });

brand.hasMany(product, {
    foreignKey: 'brand_id',
    as: 'products'
});

export default brand;