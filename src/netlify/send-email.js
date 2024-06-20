const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  const { name, email, message } = JSON.parse(event.body);

  // Konfigurera transporter för nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Du kan använda vilken e-posttjänst som helst
    auth: {
      user: 'simonlj8@gmail.com', 
      pass: process.env.EMAIL_PASSWORD 
    },
  });

  const mailOptions = {
    from: email,
    to: 'simonlj8@gmail.com', // Din e-postadress där du vill ta emot meddelandet
    subject: `Nytt meddelande från ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};