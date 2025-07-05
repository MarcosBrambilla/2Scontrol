import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

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

export default brand;