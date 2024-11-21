import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = "postgres://admin:admin@database:5432/taxi_db";

const sequelize = new Sequelize(databaseUrl || '', {
  dialect: 'postgres',
  logging: false
});

export default sequelize;
