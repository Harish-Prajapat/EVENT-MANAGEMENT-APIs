import express from 'express'
import {createEvent, getEvent , getAllEvents, deleteEvent,eventRegistration, deleteRegistration, upcomingEvents, eventStats} from '../Controllers/eventControllers.js'
import verifyRegistration from '../Middlewares/veriify.js'
const Router = express.Router()

Router.post('/create', createEvent)
Router.get('/allEvents', getAllEvents)
Router.get('/upcoming', upcomingEvents)
Router.get('/:id', getEvent)
Router.delete('/:id', deleteEvent)
Router.post('/:id/register',verifyRegistration, eventRegistration)
Router.delete('/:id/delReg', deleteRegistration)
Router.get('/:id/stats', eventStats)



export default Router