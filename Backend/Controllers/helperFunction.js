import dbConnection from '../Config/dbConnection.js'

const verifyEvent = async(id)=>{
    const query = 'SELECT * FROM events WHERE id = $1'
    const result = await dbConnection.query(query,[id])
    if(result.rowCount == 0){
        throw new Error('Event does not exist');
    }
    return result.rows
}

export {verifyEvent}