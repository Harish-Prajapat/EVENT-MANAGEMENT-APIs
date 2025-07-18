import dbConnection from '../Config/dbConnection.js'

const verifyRegistration = async(req,res,next)=>{

    try {
        const eventId = req.params.id
    const userId = req.body.user_id

    if(!eventId || !userId){
        return res.status(400).send(' Event ID and User ID are required ')
    }

    const [[event], [user], registrations] = await Promise.all([
        dbConnection.query('SELECT id FROM events WHERE id = $1', [eventId]).then(r => r.rows),
        dbConnection.query('SELECT id FROM users WHERE id = $1', [userId]).then(r => r.rows),
        dbConnection.query('SELECT id FROM registrations WHERE user_id = $1 AND event_id = $2', [userId, eventId]).then(r => r.rows)
      ]);
    
      if (!event) return res.status(404).send('Event not found');
    if (!user) return res.status(404).send('User not found');
    if (registrations.length > 0) return res.status(409).send('User already registered for this event');

    next();

    } catch (error) {
        console.error('Middleware error:', error.message);
        res.status(500).send('Internal Server Error');
    }
    

    
}

export default verifyRegistration;