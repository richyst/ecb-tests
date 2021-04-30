import { APIGatewayProxyResultV2 } from 'aws-lambda'

/**
 * errorBodyResponse returns an object understood by AWS as an error response
 *
 * @param {string} type error type
 * @param {number} status error http code
 * @param {string} code error code
 * @param {string} detail error detail
 * @param {string} message error message
 * @returns {APIGatewayProxyResultV2} object describing http response 
 */
const errorBodyResponse = (type: string, status: number, code: number, detail: string, message: string) : APIGatewayProxyResultV2 => {
  const body = JSON.stringify({
    type,
    status,
    code,
    detail,
    message
  })

  console.log(body)

  return {
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': false,
      'Access-Control-Allow-Methods': '*'
    },
    statusCode: status,
    body
  }
}

/**
 * buildResponse handler for unexpected errors
 * 
 * @param {Record<string,any>} err object matching http response format
 * @returns {APIGatewayProxyResultV2} same as received or created a valid 500 error object
 */
const buildErrorResponse = (err : Record<string, any>) : APIGatewayProxyResultV2 => {
  console.log(err)
  if (err.statusCode) {
    return err
  }
  return errorResponse(500, err.message, { TYPE: 'internal server error', CODE: 500, DETAIL: err.message})
}

/**
 * errorResponse abstracts errorBodyResponse's functionality in a simple interface
 * 
 * @param {number} statusCode http response code
 * @param {string} message custom error message
 * @param {Record<string,any>} errorObject object matching the enum format we have for errors
 * @returns {Object} as returned by errorBodyResponse
 */
const errorResponse = (statusCode: number, message: string, errorObject: Record<string,any>) : APIGatewayProxyResultV2 => {
  return errorBodyResponse(
    errorObject.TYPE,
    statusCode,
    errorObject.CODE,
    errorObject.DETAIL,
    message
  )
}

/**
 * successResponse prepares the response in case everything worked perfectly
 * 
 * @param {string|object} message is either a json with requested details or a success message
 * @returns {APIGatewayProxyResultV2} valid request response object
 */
const successResponse = (message : any) : APIGatewayProxyResultV2 => {
  const msg = typeof message !== 'string' ? JSON.stringify(message) : message
  return {
    headers: {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': false,
      'Access-Control-Allow-Methods': '*'
    },
    statusCode: 200,
    body: msg
  }
}

export default {
  errorBodyResponse,
  errorResponse,
  successResponse,
  buildErrorResponse
}
