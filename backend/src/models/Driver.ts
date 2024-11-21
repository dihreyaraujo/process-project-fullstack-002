import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Driver extends Model {
  id?: number;
  name?: string;
  description?: string;
  vehicle?: string;
  rate!: number;
  minKm!: number;
  rating!: number;
  comment?: string;
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
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    minKm: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
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