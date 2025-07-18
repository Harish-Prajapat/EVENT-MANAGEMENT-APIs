import express from 'express'
import {createUser} from '../Controllers/userControllers.js'
const Router = express.Router()

Router.post('/createUser', createUser)

export default Router
