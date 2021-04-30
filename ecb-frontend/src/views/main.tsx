import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner/spinner'
import UserForm from '../components/UserForm/user-form'
import Vehicle from '../components/Vehicle/vehicle'
import VehicleInterface from '../interfaces/vehicle.interface'
import Drawer from '../layout/Drawer/drawer'
import ApiService from '../util/api-service'
import './main.scss'

const Main = () : React.ReactElement => {
  const [vehicles, setVehicles] = useState<Array<VehicleInterface>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null)
  useEffect(() => {
    ApiService.getVehicles()
      .then(vehicleData => { setVehicles(vehicleData) })
      .catch(err => setError(err.message))
      .finally(() => { setLoading(false) })
  }, [])
  
  const onVehicleClick = (vehicleID? : number) : void => {
    if (!vehicleID) {
      alert('Vehicle without ID, can\'t perform actions with it.')
      return
    }
    setSelectedVehicle(vehicleID)
  }

  return (
    <>
      <div className="container">
        {loading ? <Spinner /> : null}
        {error ? <p className="error-msg">Error reaching API: <br/>{error}</p> : null}
        <div className="vehicles-container">
          {vehicles.map((vehicle, idx) => 
            <Vehicle
              selected={selectedVehicle === vehicle.id}
              onClick={onVehicleClick}
              key={vehicle.id || vehicle.km || idx}
              {...vehicle}
            />
          )}
        </div>
      </div>
      <Drawer open={!!selectedVehicle} closeDrawer={setSelectedVehicle.bind(this, null)}>
        {selectedVehicle ? <UserForm vehicleId={selectedVehicle}></UserForm> : null}
      </Drawer>
    </>
  )
}
export default Main
