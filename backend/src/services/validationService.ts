import Driver from '../models/Driver';
import { DriverRepository } from '../repositories/driverRepository';
import { driversMock } from '../mocks/driversMock';

export const validateRideRequest = (customer_id: string, origin: string, destination: string) => {
  if (!customer_id || customer_id === "" || !origin || !destination) {
    throw new Error("Não há presença de todos os dados necessários.")
  } else if (origin === destination) {
    throw new Error("A rota de origem não pode ser igual a rota de destino.")
  }
};

export const validateRideConfirm = async (customer_id: string, origin: string, destination: string, driver_id: number, distance: number) => {
  validateRideRequest(customer_id, origin, destination);
  // const validateDriver = await DriverRepository.getDriverById(driver_id);
  const validateDriver = driversMock.find((driver) => driver.id === Number(driver_id));
  if (!validateDriver) {
    throw new Error("Motorista informado não foi encontrado")
  } else if (distance < validateDriver.minKm) {
    throw new Error("A distância da corrida não é compatível com o motorista selecionado");
  }
}

export const validateCustomer = (customer_id: string) => {
  if (!customer_id || customer_id === "") {
    throw new Error("Usuário não informado");
  }
}

export const validateDriver = async (driver_id: number) => {
  // const validateDriver = await DriverRepository.getDriverById(driver_id);
  const validateDriver = driversMock.find((driver) => driver.id === driver_id);
  if (!validateDriver) {
    throw new Error("Motorista inválido");
  }
}
