import app from './app';
import dotenv from 'dotenv';
import { sequelize, Driver } from './models';
import { driversMock } from './mocks/driversMock';

dotenv.config();

const PORT = process.env.PORT || 8080;

async function populateDatabase() {
  try {
    const driversCount = await Driver.count();
    if (driversCount === 0) {
      await Driver.bulkCreate(driversMock);
      console.log('Banco de dados populado com os motoristas.');
    } else {
      console.log('Tabela já contém dados, nada foi adicionado.');
    }
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  }
}

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, async () => {
    await populateDatabase();
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error: any) => {
  console.error('Unable to connect to the database', error);
});
