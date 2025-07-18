import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './Config/dbConnection.js'
import eventRoutes from './Routes/eventRoutes.js'
import userRoutes from './Routes/userRoutes.js'

dotenv.config()

let port = process.env.PORT || 8000
const app = express()


app.use(express.json())
app.use('/surefy/events', eventRoutes)
app.use('/surefy/users/', userRoutes)


dbConnection
app.listen(port, ()=>{
    
    console.log(`Server is running on ${port}`)
})