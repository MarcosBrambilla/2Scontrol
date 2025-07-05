import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const entity = sequelize.define('entity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    contactInfo: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, { timestamps: true });

export default entity;