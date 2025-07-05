import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const stock_movement = sequelize.define('stock_movement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.ENUM('entry', 'output'),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'suppliers',
            key: 'id'
        }
    },
    entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'entities',
            key: 'id'
        }
    }
}, {
    timestamps: true
});

export default stock_movement;