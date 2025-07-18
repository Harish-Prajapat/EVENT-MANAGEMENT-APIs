import dbConnection from '../Config/dbConnection.js'


// ************************* Create User **********************
const createUser =  async(req,res)=>{
    try {
        const {name, email} = req.body
        if(!name  || !email  ){
            return  res.status(400).send('All fields mandatory')
        }

        const query1 = 'SELECT email FROM Users WHERE email = $1   '
        const isUser = await dbConnection.query(query1,[email])
            if(isUser.rows.length>0)  return res.status(400).send("User already exist")

        const query2 = 'INSERT INTO Users (name,email) VALUES($1,$2) RETURNING * '   
        const insertUser = dbConnection.query(query2,[name,email])  
        
        return res.status(200).send({Message : 'User Successfully Added', User : (await insertUser).rows  })
        
    } catch (error) {
        return res.status(500).send({Message : error.message});
    }
}


// ************************* Create User **********************
const getUser = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}



// ************************* Create User **********************
const getAllUser = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

// ************************* Create User **********************

const deleteUser = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}








export {createUser , getUser, getAllUser , deleteUser}