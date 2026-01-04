import { connect } from 'mongoose'

const mongoURI = process.env.MONGODB_URI || ''

const db = async () => {
  try {
    await connect(mongoURI)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export default db
