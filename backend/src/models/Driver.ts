import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../database';

export default class Driver extends Model {
  id?: number;
  name?: string;
  description?: string;
  vehicle?: string;
  rate!: string;
  minKm!: number;
  rating!: string;

  static initModel(sequelize: Sequelize) {
    Driver.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        vehicle: {
          type: DataTypes.STRING,
          allowNull: false
        },
        rating: {
          type: DataTypes.STRING,
          allowNull: false
        },
        rate: {
          type: DataTypes.STRING,
          allowNull: false
        },
        minKm: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: 'Driver',
        tableName: 'drivers',
        timestamps: false
      }
    );
  }

};