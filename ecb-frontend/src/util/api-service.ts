import axios from 'axios'
import User from '../interfaces/user.interface'
import Vehicle from '../interfaces/vehicle.interface'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI
})

const getUsers = async (id : string) : Promise<Array<User>> => {
  try {
    const { data } = await instance.get(`/users/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

const createUser = async (user : User) : Promise<User> => {
  try {
    const { data } = await instance.post('/users', user)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

const getVehicle = async (id : string) : Promise<Vehicle> => {
  try {
    const { data } = await instance.get(`/vehicles/${id}`)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

const getVehicles = async () : Promise<Array<Vehicle>> => {
  try {
    const { data } = await instance.get('/vehicles')
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}

export default { 
  createUser,
  getUsers,
  getVehicle,
  getVehicles
}
