export default {
  unparseable_body: {
    CODE: 'bad request',
    TYPE: 'UNPARSEABLE_BODY',
    DETAIL: 'Unable to parse the request body'
  },
  missing_vehicle_id: {
    CODE: 'bad request',
    TYPE: 'PARAM_NOT_PROVIDED',
    DETAIL: 'Request requires an ID to find a vehicle'
  },
  missing_user_id: {
    CODE: 'bad request',
    TYPE: 'PARAM_NOT_PROVIDED',
    DETAIL: 'Request requires an ID to find a user'
  },
  vehicle_not_found: {
    CODE: 'not found',
    TYPE: 'VEHICLE_NOT_FOUND',
    DETAIL: 'Vehicle was not found with given ID'
  },
  user_not_found: {
    CODE: 'not found',
    TYPE: 'USER_NOT_FOUND',
    DETAIL: 'User was not found with given ID'
  },
  user_not_created: {
    CODE: 'internat server error',
    TYPE: 'USER_NOT_CREATED',
    DETAIL: 'Failed to save user for some reason'
  }
}