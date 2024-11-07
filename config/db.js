import Knex from 'knex';
import knexConfig from '../knexfile.js';

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
export default knex;
