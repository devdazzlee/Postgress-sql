import express from 'express';
import { createProduct } from '../controllers/inventoryController.js';

const router = express.Router();

// Routes for the inventory schema
router.post('/products', createProduct);
// Add routes for other inventory operations here (e.g., CRUD for `stock`)

export default router;
