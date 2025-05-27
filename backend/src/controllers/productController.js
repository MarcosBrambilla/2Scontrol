import Product from '../models/product.js';

const addProduct = async (req, res) => {
    try {
        const { nome_produto, marca_produto, imagem, estoque_minimo, envia_alerta, quantidade_estoque, custo_produto } = req.body;
        const newProduct = await Product.create({
            nome_produto,
            marca_produto,
            imagem,
            estoque_minimo,
            envia_alerta,
            quantidade_estoque,
            custo_produto
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Product.update(req.body, {
            where: { id_produto: id }
        });
        if (updated) {
            const updatedProduct = await Product.findOne({ where: { id_produto: id } });
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({
            where: { id_produto: id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ where: { id_produto: id } });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};

const productController = { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById };
export default productController;