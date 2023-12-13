const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  event_name: String,
  event_description: String,
  event_price: Number, 
 event_time: String,
 event_date: String,
 event_image: String 
  
});

const EventData = mongoose.model('Product', EventSchema); 

module.exports = EventData;
