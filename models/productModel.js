exports.up = async function (knex) {
    await knex.schema
      .raw('CREATE SCHEMA IF NOT EXISTS sales')
      .raw('CREATE SCHEMA IF NOT EXISTS inventory');
  
    await knex.schema
      .withSchema('sales')
      .createTable('customers', (table) => {
        table.increments('customer_id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
      })
      .withSchema('sales')
      .createTable('orders', (table) => {
        table.increments('order_id').primary();
        table
          .integer('customer_id')
          .references('customer_id')
          .inTable('sales.customers')
          .onDelete('CASCADE');
        table.date('order_date').defaultTo(knex.fn.now());
      })
      .withSchema('inventory')
      .createTable('products', (table) => {
        table.increments('product_id').primary();
        table.string('name').notNullable();
        table.decimal('price', 10, 2).notNullable();
      })
      .withSchema('inventory')
      .createTable('stock', (table) => {
        table
          .integer('product_id')
          .references('product_id')
          .inTable('inventory.products')
          .onDelete('CASCADE');
        table.integer('quantity').defaultTo(0);
      });
  };
  
  exports.down = async function (knex) {
    await knex.schema
      .withSchema('inventory')
      .dropTableIfExists('stock')
      .withSchema('inventory')
      .dropTableIfExists('products')
      .withSchema('sales')
      .dropTableIfExists('orders')
      .withSchema('sales')
      .dropTableIfExists('customers')
      .raw('DROP SCHEMA IF EXISTS sales CASCADE')
      .raw('DROP SCHEMA IF EXISTS inventory CASCADE');
  };
  