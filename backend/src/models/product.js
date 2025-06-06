import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import brand from './brand.js';

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
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    current_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    minimal_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    send_alert: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    product_value: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true
});
  
product.belongsTo(brand, {
    foreignKey: 'brand_id',
    as: 'brand'
});

export default product;