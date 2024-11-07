import knex from '../config/db.js';

// CREATE a new product
export const createProduct = async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const result = await knex('inventory.products').insert({ name, price }).returning('*');
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Other CRUD functions for products and stock...
