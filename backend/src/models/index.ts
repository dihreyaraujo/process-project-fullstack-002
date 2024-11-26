import { Sequelize } from "sequelize";
import pg from 'pg';
import Driver from "./Driver";
import Ride from "./Ride";

const config: any = {
  username: 'admin',
  password: 'admin',
  database: 'taxidb',
  host: 'database',
  port: 5432,
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  port: config.port,
  dialectModule: pg
});

Driver.initModel(sequelize);
Ride.initModel(sequelize);

export { sequelize, Driver, Ride }
