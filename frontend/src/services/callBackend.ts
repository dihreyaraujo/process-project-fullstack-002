import axios from "axios"

export const rideRequestInfo = async (customer_id: string, origin: string, destination: string) => {
  try {
    const objectInfo = await axios.post('http://localhost:8080/ride/estimate', { customer_id, destination, origin });
    return objectInfo.data;
  } catch (err: any) {
    throw new Error(err.response.data.error_description);
  }
};

export const choiceDriver = async (rideHistoricObject: any) => {
  try {
    await axios.patch('http://localhost:8080/ride/confirm', rideHistoricObject)
  } catch (err: any) {
    throw new Error(err.response.data.error_description);
  }
}