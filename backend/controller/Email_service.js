const nodemailer = require('nodemailer');
 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'utpaltak1999ca@gmail.com',  
    pass: 'awfg bmxd bjyn zyzm',  
  },
});

// Function to send an email
const Email_service = async (toEmail, subject, eventData) => {
  try {
    const mailOptions = {
      from: 'utpaltak1999ca@gmail.com', 
      headers: {
        'Content-Type': 'text/html',
      },
      to: toEmail, 
      subject: subject, 
      html: ` <p>Dear User,</p>
      <p>Thankkkkkkk you for your purchase!</p>
      <p>Order Details:</p>
      <ul>
        <li><strong>Product Name:</strong> ${eventData.event_name}</li>
        <li><strong>Price:</strong> ${eventData.event_price}</li>
        <li><strong>Order Number:</strong> ${eventData._id}</li>
        <li><strong>Event date:</strong> ${eventData.event_date}</li>
        <li><strong>Event time:</strong> ${eventData.event_time} PM</li>
      </ul>
      <p>Your tickets have been successfully booked for the upcoming event.</p>
      <p>Please bring this email or the confirmation code provided below for entry on the event day.</p>
      <p><strong>Confirmation Code:</strong> ${eventData._id}</p>
      <p>If you have any inquiries or need further assistance, please contact our support team at support@example.com.</p>
      <p>We look forward to seeing you at the event!</p>
      <p>Best regards,<br/>Utpal Tank</p>
    `, 
    };

 
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;  
  } catch (error) {
    console.error('Error sending email:', error);
    return false; // Failed to send email
  }
};

module.exports = Email_service; // Export the function for use in other parts of your application
