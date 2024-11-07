import express from 'express';
import dotenv from 'dotenv';
import salesRoutes from './routes/salesRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Use the routes
app.use('/sales', salesRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
