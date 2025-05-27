import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Supplier = sequelize.define('Supplier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactInfo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

export default Supplier;