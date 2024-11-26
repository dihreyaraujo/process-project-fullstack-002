import axios from "axios"
import { IRideEstimate } from "../interfaces/IRideEstimate";
import { IDriver } from "../interfaces/IDriver";
import { IRideHistoricRequest } from "../interfaces/IRideHistoricRequest";
import { IRideHistoricResponse } from "../interfaces/IRideHistoricResponse";

export const rideRequestInfo = async (customer_id: string, origin: string, destination: string): Promise<IRideEstimate> => {
  try {
    const objectInfo = await axios.post('http://localhost:8080/ride/estimate', { customer_id, destination, origin });
    return objectInfo.data;
  } catch (err: any) {
    throw new Error(err.response.data.error_description);
  }
};

export const choiceDriver = async (rideHistoricObject: IRideHistoricRequest) => {
  try {
    await axios.patch('http://localhost:8080/ride/confirm', rideHistoricObject)
  } catch (err: any) {
    throw new Error(err.response.data.error_description);
  }
}

export const rideHistoric = async (customer_id: string): Promise<IRideHistoricResponse> => {
  try {
    const responseHistoric = await axios.get(`http://localhost:8080/ride/${customer_id}`);
    return responseHistoric.data;
  } catch (err: any) {
    throw new Error(err.response.data.error_description);
  }
}

export const getDrivers = async (): Promise<IDriver[]> => {
  const responseDrivers = await axios.get('http://localhost:8080/ride/drivers');
  return responseDrivers.data;
}
