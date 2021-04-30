import * as mongoose from 'mongoose'
import User, { UserModelInterface } from './user.interface'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  estimateDate: {
    type: Date,
    required: true
  },
  vehicleId: {
    type: Number,
    required: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userModel = mongoose.model<any, UserModelInterface>('User', userSchema)

/**
 * create a User according to schema and insert to db
 * 
 * @param {User} inst data for User to be inserted to db
 * @returns {mongoose.Document} newly created document
 */
userSchema.statics.build = (inst: User) => new userModel(inst)

export { userModel }
