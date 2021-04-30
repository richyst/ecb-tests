import { FocusEvent, useState } from 'react'
import User from '../../interfaces/user.interface'
import ApiService from '../../util/api-service'
import Spinner from '../Spinner/spinner'
import './user-form.scss'

interface UserFormProps {
  vehicleId: number
}

const UserForm = ({ vehicleId } : UserFormProps) : React.ReactElement=> {
  const [name, setName] = useState('')
  const [estimateDate, setEstimateDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [newUser, setNewUser] = useState<User | any>({})

  const onSubmit = (event : React.FormEvent<HTMLFormElement>) : void => {
    event.preventDefault()
    setLoading(true)
    const user : User = {
      name,
      estimateDate: new Date(estimateDate),
      vehicleId
    }
    ApiService.createUser(user)
      .then((data) => {
        setNewUser(data)
        setName('')
        setEstimateDate('')
      })
      .catch(console.error)
      .finally(() => { setLoading(false) })
  }


  const validateInput = (event : FocusEvent<HTMLInputElement>) : void => {
    const nextSibling =  event.target.nextSibling as HTMLParagraphElement
    if(!event.target.validity.valid) {
      nextSibling.classList.add('visible')
      nextSibling.innerText = `Value of the ${event.target.id.replace('-', ' ')} field is invalid`
    } else {
      nextSibling.classList.remove('visible')
      nextSibling.innerText = ' '
    }
  }
  
  const newUserData : React.ReactNode = newUser.name ? (
    <div className="new-user-data">
      <p className="success-message">User newly created</p>
      {Object.keys(newUser).map(key => (
        <p><span>{key}</span>: {newUser[key]}</p>
      ))}
    </div>
  ) : null

  return (
    <form className="user-form" onSubmit={onSubmit}>
      <input
        id="name"
        placeholder="Name of the person"
        required
        value={name}
        onChange={({target: {value}}) => setName(value)}
        onBlur={validateInput}
        type="text"
      />
      <p className="error-msg">Name is invalid</p>
      <input
        id="estimate-date"
        value={estimateDate}
        onChange={({target: {value}}) => setEstimateDate(value)}
        onBlur={validateInput}
        required
        min="2021-04-30"
        type="date"
      />
      <p className="error-msg">Estimate date is invalid</p>
      <button disabled={loading} type="submit">Submit vehicle: {vehicleId}</button>
      {loading ? <Spinner /> : null}
      {newUserData}
    </form>
  )
}

export default UserForm
