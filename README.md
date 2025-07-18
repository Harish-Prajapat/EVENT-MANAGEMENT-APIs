 Event Management API -- Assignment By Surefy Technologies
 
These are the api for managine events , users and event-registration in Node.js, Express.js, PostgreSQL

Instructions For Setup

1.  **Clone the repo**
   ''''bash
       git clone https://github.com/Harish-Prajapat/EVENT-MANAGEMENT-APIs.git

2. ** Go to project directory
    cd EVENT-MANAGEMENT-APIs/Backend

3. ** Install dependencies
    npm install

4. ** Create .env file
    PORT = yourPort
DB_USER = your_userName
DB_HOST = localhost
DB_NAME = your_dbName
DB_PASSWORD =your_password
DB_PORT = your_portAddress

5. ** Start Sever
    npm start

******************************************** Query to create table ****************************
1. TABLE FOR EVENTS

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
     title VARCHAR(255) UNIQUE NOT NULL,
      date TIMESTAMP WITH TIME ZONE NOT NULL,
       time TIME NOT NULL,
        location VARCHAR(255) NOT NULL,
         capacity INT NOT NULL 
);

2. TABLE FOR USER

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

3. TABLE FOR EVENT REGISTRATION

CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
     user_id INT NOT NULL,
      event_id INT NOT NULL,
       registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, event_id),
         FOREIGN KEY (user_id) REFERENCES users(id) ,
          FOREIGN KEY (event_id) REFERENCES events(id) 
);


******************************************** APIs END-POINTS ***********************************

1.  Create Event
      POST :: http://localhost_yourPort/surefy/events/create
        
      Request Body -- json
          {
            "title": "Surefy Technologies Event",
             "date": "2025-08-20",
               "time": "14:00:00",
                 "location": "Bangalore",
                   "capacity": 100
         }

2. Get Events by id
     GET ::  http://localhost_yourPort/surefy/events/1

  RESPONSE: 
      {
        "event":
        {
        "id": 1,
        "title": "Surefy Technologies Event",
        "date": "2025-08-20",
        "time": "14:00:00",
        "location": "Bangalore",
        "capacity": 850
      }
    }


3.   Get All Events
       GET ::   http://localhost_yourPort/surefy/events/allEvents

        RESPONSE :
            {
              "length": 1,
              "allEvents": {
              "command": "SELECT",
              "rowCount": 1,
              "oid": null,
                "rows": [
                {
                    "id": 16,
                    "title": "Surefy Technologies Event",
                    "date": "2025-08-14T18:30:00.000Z",
                    "time": "12:30:00",
                    "location": "Bangalore",
                    "capacity": 850
              }}


4.   Register in Event
       POST ::   http://localhost_yourPort/surefy/events/1/register
             Request Body -- json
               {"user_id":4 }

       RESPONSE :
          {
            "id": 32,
            "user_id": 4,
            "event_id": 54,
            "registered_at": "2025-07-19"
          }

     
6.  Cancel an event registration
      DELETE ::  http://localhost_yourPort/surefy/events/1/delReg
    
       RESPONSE :
 {
  "Message": "User registration deleted",
  "Deleted_Registration": [
    {
      "id": 29,
      "user_id": 2,
      "event_id": 1,
      "registered_at": "2025-07-18T10:59:24.268Z"
    }
    }


7.  Listing upcoming Events
      GET ::  http://localhost_yourPort/surefy/events/upcoming

    RESPONSE :
        {
            "length": 27,
            "data": [
            {........... },
            {............},
        ]}


8.   Stats of an event
        GET ::  http://localhost_yourPort/surefy/events/1/stats

       RESPONSE :
            {
              Total_Registration: 3,
              Remaining_Slots: 997,
                Percentage_filled: 0.3
            }



9,     Delete an Event 
        DELETE ::  http://localhost_yourPort/surefy/events/1

  RESPONSE : 
        {
  "Message": " Event with Id 21 is deleted",
  "Event": {
    "id": 21,
    "title": "butrega deals",
    "date": "2025-08-14T18:30:00.000Z",
    "time": "12:30:00",
    "location": "jaipur",
    "capacity": 1000
  }
}



****************************** USER API  ****************************

1.   Create User
    POST :  http://localhost_yourPort/surefy/users/createUser

     Request Body : 
          {
              "name":" harish prajapat",
               "email":"harish.coder09@gmail.com"
          }










