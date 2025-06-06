import Brand from '../models/brand.js';

const addBrand = async (req, res) => {
    try {
        const { name, description, products_id } = req.body;
        const newBrand = await Brand.create({
            name,
            description,
            imagem,
            products_id
        });
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(500).json({ message: 'Não foi possível adicionar a marca. ', error });
    }
};

const updateBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Brand.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedBrand = await Brand.findOne({ where: { id_produto: id } });
            res.status(200).json(updatedBrand);
        } else {
            res.status(404).json({ message: 'Marca não encontrada! ' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar a marca.', error });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Brand.destroy({
            where: { id: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Marca não encontrada! ' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar Marca! ', error });
    }
};

const getAllBrands = async (req, res) => {
    try {
        const brand = await Brand.findAll();
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao recuperar Marcas! ', error });
    }
};

const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        const brand = await Brand.findOne({ where: { id: id } });
        if (brand) {
            res.status(200).json(brand);
        } else {
            res.status(404).json({ message: 'Marca não encontrada! ' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};

const brandController = { addBrand, updateBrand, deleteBrand, getAllBrands, getBrandById };
export default brandController;