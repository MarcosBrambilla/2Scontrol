import express from 'express';
import brandController from '../controllers/brandControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, brandController.addBrand);
router.get('/', authMiddleware, brandController.getAllBrands);
router.get('/:id', authMiddleware, brandController.getBrandById);
router.put('/:id', authMiddleware, brandController.updateBrand);
router.delete('/:id', authMiddleware, brandController.deleteBrand);

const BrandsRoutes = router;
export default BrandsRoutes;