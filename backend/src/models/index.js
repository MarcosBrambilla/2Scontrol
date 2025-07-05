import product from'./product.js';
import supplier from'./supplier.js'; 
import user from'./user.js';
import brand from'./brand.js';
import stock_movement from'./stock_movement.js';
import entity from './entity.js'; 

// Product has one brand, and a brand has many products
product.belongsTo(brand, { foreignKey: 'brand_id', as: 'brand' });
brand.hasMany(product, { foreignKey: 'brand_id', as: 'products' });

// Stock movement has one product, and a product has many stock movements
stock_movement.belongsTo(product, { foreignKey: 'product_id', as: 'product' });
product.hasMany(stock_movement, { foreignKey: 'product_id', as: 'stock_movements' });

// Stock movement has one supplier, and a supplier has many stock movements
stock_movement.belongsTo(supplier, { foreignKey: 'supplier_id', as: 'supplier' });
supplier.hasMany(stock_movement, { foreignKey: 'supplier_id', as: 'stock_movements' });

// Stock movement has one entity, and an entity has many stock movements
stock_movement.belongsTo(entity, { foreignKey: 'entity_id', as: 'entity' });
stock_movement.hasMany(entity, { foreignKey: 'entity_id', as: 'stock_movements' });

const models = {product, supplier, user, brand, stock_movement, entity};
export default models;