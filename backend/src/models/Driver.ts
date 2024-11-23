import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Driver extends Model {
  id?: number;
  name?: string;
  description?: string;
  vehicle?: string;
  rate!: string;
  minKm!: number;
  rating!: string;
};

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
  }
);

export default Driver;