import { DriverRepository } from '../repositories/driverRepository';

export const validateRideRequest = (customer_id: string, origin: string, destination: string): void => {
  if (!customer_id || customer_id === "" || !origin || !destination) {
    throw new Error("Não há presença de todos os dados necessários.")
  } else if (origin.toLowerCase() === destination.toLowerCase()) {
    throw new Error("A rota de origem não pode ser igual a rota de destino.")
  }
};

export const validateRideConfirm = async (customer_id: string, origin: string, destination: string, driver_id: number, distance: number): Promise<void> => {
  validateRideRequest(customer_id, origin, destination);
  const validateDriver: IDriver | null = await DriverRepository.getDriverById(driver_id);
  if (!validateDriver) {
    throw new Error("Motorista informado não foi encontrado")
  } else if ((distance / 1000) < validateDriver.minKm) {
    throw new Error("A distância da corrida não é compatível com o motorista selecionado");
  }
}

export const validateCustomer = (customer_id: string): void => {
  if (!customer_id || customer_id === "") {
    throw new Error("Usuário não informado");
  }
}

export const validateDriver = async (driver_id: number): Promise<void> => {
  const validateDriver: IDriver | null = await DriverRepository.getDriverById(driver_id);
  if (!validateDriver) {
    throw new Error("Motorista inválido");
  }
}
