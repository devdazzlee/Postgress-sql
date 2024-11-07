import knex from '../config/db.js';

// CREATE a new product
export const createProduct = async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const result = await knex('products').insert({ name, price, quantity }).returning('*');
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// READ all products
export const getProducts = async (req, res) => {
  try {
    const products = await knex('products').select('*');
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

// READ a product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await knex('products').where({ product_id: id }).first();
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
};

// UPDATE a product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  try {
    const result = await knex('products')
      .where({ product_id: id })
      .update({ name, price, quantity })
      .returning('*');
    if (result.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await knex('products').where({ product_id: id }).del().returning('*');
    if (result.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json({ message: 'Product deleted', product: result[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
