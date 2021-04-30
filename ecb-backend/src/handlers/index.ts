import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from 'aws-lambda'
import * as mongoose from 'mongoose'

import enums from '../utils/enums'
import decode from '../utils/Decode'
import customResponse from '../utils/CustomResponse'

import User from '../models/user/user.interface'

import userController from '../models/user/controller'
import vehicleController from '../models/vehicle/controller'


let dbconn = false
const uri = process.env.MONGO_URI || ''

const connectToDB = async () : Promise<void> => {
  if (!dbconn) {
    await mongoose.connect(uri, {
      bufferCommands: false,
      autoCreate: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    dbconn = true
  }
}

/**
 * demoServerless is auth validated endpoint
 * 
 * @param {APIGatewayProxyEventV2} event object containing the entire request information
 * @param {any} context Event context
 * @returns {Promise<APIGatewayProxyResultV2>} either success or error response object
 */
const getVehiclesHandler : APIGatewayProxyHandlerV2 = async (event : APIGatewayProxyEventV2, context) : Promise<APIGatewayProxyResultV2> => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    return await vehicleController.fetchVehicles()
  } catch (error) {
    return error
  }
}

/**
 * demoServerless is auth validated endpoint
 * 
 * @param {APIGatewayProxyEventV2} event object containing the entire request information
 * @param {any} context Event context
 * @returns {Promise<APIGatewayProxyResultV2>} either success or error response object
 */
const getVehicleHandler : APIGatewayProxyHandlerV2 = async (event : APIGatewayProxyEventV2, context) : Promise<APIGatewayProxyResultV2> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { id } = event.pathParameters || {}
  if (!id) {
    return customResponse.errorResponse(
      400,
      'Vehicle id was not specified.',
      enums.missing_vehicle_id
    )
  }
  try {
    return await vehicleController.fetchVehicle(id)
  } catch (error) {
    return error
  }
}

/**
 * 
 * @param {APIGatewayProxyEventV2} event object containing the entire request information
 * @param {any} context Event context
 * @returns {Promise<APIGatewayProxyResultV2>} either success or error response object
 */
const createUserHandler : APIGatewayProxyHandlerV2 = async (event : APIGatewayProxyEventV2, context) : Promise<APIGatewayProxyResultV2> => {
  context.callbackWaitsForEmptyEventLoop = false
  let data = {}
  try {
    data = decode.get(event.body) as User
  } catch(e) {
    return customResponse.errorResponse(
      400,
      'Couldn\'t parse request body',
      enums.unparseable_body
    )
  }

  await connectToDB()

  try {
    return await userController.createUser(data)
  } catch (err) {
    return err
  }
}

/**
 * demoServerless is auth validated endpoint
 * 
 * @param {APIGatewayProxyEventV2} event object containing the entire request information
 * @param {any} context Event context
 * @returns {Promise<APIGatewayProxyResultV2>} either success or error response object
 */
const getUserHandler : APIGatewayProxyHandlerV2 = async (event : APIGatewayProxyEventV2, context) : Promise<APIGatewayProxyResultV2> => {
  context.callbackWaitsForEmptyEventLoop = false
  const { id } = event.pathParameters || {}
  if (!id) {
    return customResponse.errorResponse(
      400,
      'User id was not specified.',
      enums.missing_user_id
    )
  }
  await connectToDB()
  try {
    return await userController.fetchUser(id)
  } catch (err) {
    return err
  }
}

module.exports = {
  getVehiclesHandler,
  getVehicleHandler,
  createUserHandler,
  getUserHandler
}
