import { APIGatewayProxyResultV2 } from 'aws-lambda'
import response from '../../utils/CustomResponse'
import enums from '../../utils/enums'
import { userModel } from './model'
import User from './user.interface'



/**
 * @param {User} data user data to be created
 * @returns {Promise<APIGatewayProxyResultV2>} to be sent to client
 */
const createUser = async (data : User | Record<string, any>) : Promise<APIGatewayProxyResultV2> => {
  const { name, estimateDate, vehicleId } = data
  try {
    if (!name) throw new Error('Field name missing in request.')
    if (!estimateDate) throw new Error('Field estimateDate missing in request.')
    if (!vehicleId) throw new Error('Field vehicleId missing in request.')

    const newUser = new userModel({ name, estimateDate, vehicleId })
    const savedUser = await newUser.save()
    return response.successResponse(savedUser)
  } catch (err) {
    console.log(err.message)
    throw response.errorResponse(
      500,
      err.message ?? 'Something went wrong creating the user.',
      enums.user_not_created
    )
  }
}

/**
 * @param {string} id to find user by
 * @returns {Promise<APIGatewayProxyResultV2>} to be sent to client
 */
const fetchUser = async ( id :string ) : Promise<APIGatewayProxyResultV2> => {
  try {
    const res = await userModel.findById(id)
    return response.successResponse(res)
  } catch (err) {
    console.log(err.message)
    throw response.errorResponse(
      404,
      err.message ?? 'User not found in db.',
      enums.user_not_found
    )
  }
}

export default {
  createUser,
  fetchUser
}
