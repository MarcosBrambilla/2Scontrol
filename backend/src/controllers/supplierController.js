import Supplier from '../models/supplier.js';

const addSupplier = async (req, res) => {
    try {
        const { name, contactInfo } = req.body;
        const newSupplier = await Supplier.create({ name, contactInfo });
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ message: 'Error adding supplier', error });
    }
};

const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, contactInfo } = req.body;
        const [updated] = await Supplier.update({ name, contactInfo }, { where: { id } });
        
        if (updated) {
            const updatedSupplier = await Supplier.findByPk(id);
            res.status(200).json(updatedSupplier);
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating supplier', error });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Supplier.destroy({ where: { id } });
        
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting supplier', error });
    }
};

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving suppliers', error });
    }
};

const getSupplierById = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByPk(id);
        
        if (supplier) {
            res.status(200).json(supplier);
        } else {
            res.status(404).json({ message: 'Supplier not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving supplier', error });
    }
};

const supplierController = { addSupplier, updateSupplier, deleteSupplier, getAllSuppliers, getSupplierById };
export default supplierController;