import express from 'express';
import { createCustomer } from '../controllers/salesController.js';

const router = express.Router();

// Define routes for the sales schema
router.post('/customers', createCustomer);

export default router;
