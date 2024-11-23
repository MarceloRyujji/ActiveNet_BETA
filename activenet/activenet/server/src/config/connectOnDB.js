import mongoose from 'mongoose'

async function connectOnDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING1)
    console.log('Successful connection to the database')
  } catch (err) {
    console.error('Error connecting to database:', err)
    process.exit(1)
  }
}

export default connectOnDB
