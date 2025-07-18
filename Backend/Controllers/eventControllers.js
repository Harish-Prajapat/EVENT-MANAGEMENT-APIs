import dbConnection from '../Config/dbConnection.js'
import { verifyEvent } from './helperFunction.js';
import moment from 'moment-timezone'



//  ****************** Create Event   **********************
const createEvent = async (req, res) => {
    try {
        const { title, date, location, capacity, time } = req.body;

        if (!title || !date || !location || !capacity || !time) {
            return res.status(400).send("All fields are mandatory");
        }

        if(capacity < 0 || capacity > 1000){
            return res.status(400).send('Event capacity must be between 1 to 1000')
        }
      
        const searchQuery = 'SELECT * FROM events WHERE title = $1';
        const isExist = await dbConnection.query(searchQuery, [title]);

        if (isExist.rows.length > 0) {
            return res.send('Event already exists');
        }
       
        const insertQuery = 'INSERT INTO events (title, date, location, capacity, time) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const result = await dbConnection.query(insertQuery, [title, date, location, capacity, time]);

        return res.status(200).json({Message:'Event created', Event : result.rows});

    } catch (err) {
        
        return res.status(500).send(err.message, err);
    }
};



//  ****************** Get Events by id **********************
const getEvent = async(req,res)=>{
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).send('Select an Event')
        }

        const query1 = 'SELECT id FROM events WHERE id = $1'
        const result1 = await dbConnection.query(query1,[id])
       

        if(result1.rows.length == 0){
            return res.status(404).send('Event does not exist')
        }
    
        const query = 'SELECT * FROM events WHERE id = $1'
        const result  = await dbConnection.query(query,[id])

        const event = result.rows[0]
        const dateInIST  = moment(event.date).tz('Asia/Kolkata').format('YYYY-MM-DD');
        event.date = dateInIST

        return res.status(200).json({event})
    } catch (err) {
        return res.status(500).send(err.message , err)
    }
   
}



//  ****************** Get All Events **********************
const getAllEvents = async (req, res)=>{
    try {
        
        const query = 'SELECT * FROM events'
    const allEvents = await dbConnection.query(query)
    
   return res.status(201).send({length : allEvents.rows.length , allEvents})

    } catch (err) {
        return res.status(500).send(err.message , err)
    }
    

}



// ******************** Register in Event ********************
const eventRegistration = async (req,res)=>{
    try {
     const eventId = req.params.id
     const userId = req.body.user_id
 
 
     const [capacityRes, filledSlotsRes, isPastEventRes] = await Promise.all([
         dbConnection.query(' SELECT capacity FROM events WHERE id = $1',[eventId]),
         dbConnection.query(' SELECT * FROM registrations WHERE event_id = $1',[eventId]),
         dbConnection.query('SELECT date FROM events WHERE id = $1',[eventId]),
     ])
 
     const capacity = capacityRes.rows[0].capacity
     const filledSlots = filledSlotsRes.rows.length
     const eventDate = isPastEventRes.rows[0].date
 
     if(filledSlots >= capacity ){return res.status(409).send('Event is full')}
     if(new Date(eventDate)<new Date()){ return res.status(400).send('Event completed, can\'t register now ')}
     
     const finalRegistration = await dbConnection.query('INSERT INTO registrations (user_id, event_id) VALUES($1,$2)  RETURNING * ',[userId, eventId])
 
     const event = finalRegistration.rows[0]
     const dateInIST  = moment(event.registered_at).tz('Asia/Kolkata').format('YYYY-MM-DD');
     event.registered_at = dateInIST
    
    
     return res.status(200).json(event)
    } catch (error) {
        return res.status(500).send(err.message , err)
    }
    
 }



 // ********************* Cancel a event registration ************************
 const deleteRegistration = async(req,res)=>{
    try {
        const registrationId = req.params.id

        const query1 =  'SELECT * FROM registrations WHERE id = $1 '
        const result =await dbConnection.query(query1,[registrationId])
        if(result.rowCount == 0){return res.status(404).send(`Registration Id does not exist with this event`)}
    
         
        const query = 'DELETE FROM registrations WHERE id = $1 RETURNING * '
        const delReg = await dbConnection.query(query,[registrationId])
    
        res.status(200).send({Message : 'User registration deleted', Deleted_Registration : delReg.rows})
    } catch (err) {
        return res.status(500).send(err.message , err)
    }
   


}



// ******************** Listing upcoming Events ********************
const upcomingEvents = async(req,res)=>{
    try {
        
        const query = 'SELECT * FROM events WHERE date >= NOW() ORDER BY date ASC, location ASC'

        const allEvents = await dbConnection.query(query).then(r=> r.rows)
        

   return res.status(201).send({length : allEvents.length , data : allEvents})

    } catch (err) {
        return res.status(500).send(err.message , err)
    }
    
}



// ********************* Stats of an event ************************
const eventStats = async (req,res)=>{

    try {
        const eventId = req.params.id
        const result1 = await verifyEvent(eventId)

        const query = 'SELECT event_id FROM registrations WHERE event_id = $1'
        const result2 = await dbConnection.query(query,[eventId])

        const totalRegistration = result2.rowCount
       
        const remainginSlots = result1[0].capacity - result2.rowCount

        const percentFilled = totalRegistration*100/result1[0].capacity

         return res.status(200).json({
            "Total_Registration" : totalRegistration,
            "Remaining_Slots": remainginSlots,
            "Percentage_filled" : percentFilled
        })
    } catch (err) {
        return res.status(500).send(err.message , err)
    }
   
}




//  ****************** Delete Event **********************
const deleteEvent = async (req,res)=>{
    try {
        const id = req.params.id
        if(!id){
            return res.status(400).send('Select an Event')
        }

        const query1 = 'SELECT id FROM events WHERE id = $1'
        const result1 = await dbConnection.query(query1,[id])
       

        if(result1.rows.length == 0){
            return res.status(404).send('Event does not exist')
        }

        const query2 = 'DELETE FROM events WHERE id = $1 RETURNING *'

        const result2 = await dbConnection.query(query2,[id])

        return res.send({Message : ` Event with Id ${id} is deleted`, Event : result2.rows[0]})
    } catch (err) {
        return res.status(500).send(err.message , err)
    }
    
}





export  {createEvent, getEvent, getAllEvents , deleteEvent,eventRegistration, deleteRegistration, upcomingEvents, eventStats}