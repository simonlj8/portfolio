const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required.' }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // Outlook SMTP-server
      port: 587,
      secure: false, // Använd true för port 465, false för andra portar
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: 'simonlj8@gmail.com', 
      subject: `New message from ${name}`,
      text: message,
      replyTo: email,
    };

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully', info }),
    };
  } catch (error) {
    console.error('Error sending email:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};