import knex from '../config/db.js';

// CREATE a new customer
export const createCustomer = async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await knex('sales.customers').insert({ name, email }).returning('*');
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
};

// Other CRUD functions for customers and orders...
