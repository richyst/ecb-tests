import VehicleInterface from '../../interfaces/vehicle.interface'
import defaultImage from '../../assets/vehicle_icon.svg'
import { useState } from 'react'
import './vehicle.scss'


export interface VehicleComponent extends VehicleInterface {
  onClick(vehicleID? : number ) : void
  selected : boolean
}

const Vehicle = ({
  make = 'N/A',
  model = 'N/A',
  id,
  image = defaultImage,
  description,
  km = 0,
  estimatedate = 'N/A',
  onClick,
  selected
} : VehicleComponent) : React.ReactElement => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [clicked, setClicked] = useState(false)

  const onImageError = (event : React.SyntheticEvent<HTMLImageElement, Event>) => {
    const el = event.target as HTMLImageElement
    el.src = defaultImage
  }

  const placeholderImg = (
    <img
      className="vehicle-card-img loaded"
      src={defaultImage}
      alt="placeholder vehicle img"
    />
  )

  const handleClick = () => {
    onClick(id)
    if(!id) return
    setClicked(true)
  }

  return (
    <div className="vehicle-card-wrapper">
      <div
        data-clicked={clicked}
        data-selected={selected}
        data-no-id={!id}
        className="vehicle-card"
        onClick={handleClick}
      >
        {imageLoaded ? null : placeholderImg}
        <img
          className={`vehicle-card-img ${imageLoaded ? 'loaded' : ''}`}
          src={image}
          alt={`Vehicle of make ${make} and model ${model}`}
          onError={onImageError}
          onLoad={setImageLoaded.bind(this, true)}
        />
        <hr/>
        <div className="details">
          <p><span>ID:</span> {id}</p>
          <p><span>Make:</span> {make}</p>
          <p><span>Model:</span> {model}</p>
          <p><span>Km:</span> {km.toLocaleString('es-MX')}</p>
          <p><span>Description:</span> {description}</p>
          <p><span>EstimateDate:</span> {estimatedate || 'N/A'}</p>
        </div>
      </div>
    </div>
  )
}
export default Vehicle
