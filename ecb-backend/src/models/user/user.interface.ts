import * as mongoose from 'mongoose'

export default interface User {
  name: string,
  estimateDate: Date,
  vehicleId: number
}

export interface UserModelInterface extends mongoose.Model<any> {
  build(inst: User): mongoose.Document
}
