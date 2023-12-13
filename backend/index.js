const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const event_database= require("../backend/model/event_database")
const multer = require('multer');
const nodemailer = require('nodemailer');
const Email_service=require('./controller/Email_service')
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests
app.use('/uploads', express.static('uploads'));
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.f8rjolj.mongodb.net/event_datas?retryWrites=true&w=majority"
);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

 

// store images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename file with timestamp
  },
});

 
 

const upload = multer({ storage: storage });

app.post('/add_product', upload.single('event_image'), async (req, res) => {
  const eventData = req.body; // Access the data sent from the frontend
  console.log('Received product data:', eventData);

  const { event_name, event_description, event_price, event_time, event_date } = req.body;
  const event_image = req.file.path; // Get the path where the file is stored

  try {
    const eventDatas = {
      event_name,
      event_description,
      event_price,
      event_time,
      event_date,
      event_image,
    };

    const result = await event_database.create(eventDatas);
    
    // Sending a response back to the client after the database operation is completed
    if (result) {
      return res.status(200).json({ message: 'Event data saved successfully', eventId: result._id });
    } else {
      return res.status(500).json({ message: 'Error occurred while saving event data' });
    }
  } catch (err) {
    console.error(err.errors);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid data format' });
    } else {
      return res.status(500).json({ message: 'Error occurred while saving event data' });
    
  }

    return res.status(500).json({ message: 'Error occurred while saving event data' });
  }
});


 
app.get('/received_events', async (req, res) => {
  try {
    const events = await event_database.find().exec(); // Execute the query to retrieve all events
  
    res.json(events); // Send the events as JSON response
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/buy_ticket', async (req,res)=>{
  const { email,eventData } = req.body;

  console.log(email,eventData)
  const emailSent = await Email_service(email, 'Ticket Purchase Confirmation',eventData
 );

  if (emailSent) {
    res.status(200).json({ message: 'Ticket purchase confirmed and email sent' });
  } else {
    res.status(500).json({ message: 'Failed to send email. Ticket purchase confirmed.' });
  }
})