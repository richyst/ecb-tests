import { APIGatewayProxyResultV2 } from 'aws-lambda'

import response from '../../utils/CustomResponse'
import enums from '../../utils/enums'
import VehicleData from './VehicleData'

/**
 * 
 * @returns {Promise<APIGatewayProxyResultV2>} to be forwarded to client
 */
const fetchVehicles = async () : Promise<APIGatewayProxyResultV2> => {
  return response.successResponse(VehicleData)
}

/**
 * 
 * @param {string} id id to find vehicle bu
 * @returns {Promise<APIGatewayProxyResultV2>} to be forwarded to client
 */
const fetchVehicle = async(id : string) : Promise<APIGatewayProxyResultV2> => {
  const parsedId = parseInt(id)
  const carFound = VehicleData.find(car => car.id === parsedId)
  if (!carFound) {
    throw response.errorResponse(
      404,
      'Vehicle not found',
      enums.vehicle_not_found
    )
  }
  return response.successResponse(carFound)
}

export default {
  fetchVehicles,
  fetchVehicle
}
