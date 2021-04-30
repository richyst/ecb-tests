import * as querystring from 'querystring'

/**
 * get parses queryparams or request's body into an object
 *
 * @param {string} data containing request body as delivered by AWS
 * @returns {Object} with parsed data into JSON object
 */
const get = (data : string | undefined) : Record<string,any> => {
  let response : Record<string, any> = {}
  if (data) {
    try {
      response = JSON.parse(data)
    } catch(err){
      response = JSON.parse(JSON.stringify(querystring.parse(data)))
    }
  }
  console.log(JSON.stringify(response))
  return response
}

export default {
  get
}
