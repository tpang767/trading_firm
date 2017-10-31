import mongoose from 'mongoose'

export default function dbConnection() {
    
    const dotenv = require('dotenv').config()

    mongoose.Promise = global.Promise;

    mongoose.connect(process.env.DB_URL, {useMongoClient: true})

    mongoose.connection.on('connected', () => {
      console.log('Mongoose default connection open')
    })

    mongoose.connection.on('error', (err) => {
      console.log('Mongoose default connection error: ' + err)
    })

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose default connection disconnected')
    })

    process.on('SIGINT', () => { mongoose.connection.close( () => { 
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0); 
      })
    })
    
}
