import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import fs from 'fs';

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "sebascha.sistemas2003@gmail.com",
      pass: "afyh atcu skir ewmu",
    },
  });

const htmlContent = fs.readFileSync('./src/index.html', 'utf8');


  app.post('/send-email', (req, res) => {
    //const { to, subject, text } = req.body;

    // Email options
    const mailOptions = {
        from: 'sebascha.sistemas2003@gmail.com', // Sender address
        to: 'sebascha.sistemas2003@gmail.com', // List of recipients
        subject: 'Bieveniedo a Devioz', // Subject line
        html: htmlContent
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(`Error sending email: ${error}`);
        }

        res.status(200).send(`Email sent: ${info.response}`);
    });
});


app.listen(3000, () => {
    console.log('Server started... in port 3000');
    console.log('Connect to email ')
    }
);

