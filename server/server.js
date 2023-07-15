const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a data model
const Data = mongoose.model('Data', {
  name: String,
  phoneNumber: String,
  email: String,
  hobbies: String,
});

// Express middleware
app.use(express.json());
app.use(cors());

// API route to add new data
app.post('/api/data', (req, res) => {
  const { name, phoneNumber, email, hobbies } = req.body;
  const newData = new Data({ name, phoneNumber, email, hobbies });

  newData
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to save data' });
    });
});

// API route to get all data
app.get('/api/data', (req, res) => {
  Data.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch data' });
    });
});

// API route to delete data by ID
app.delete('/api/data/:id', (req, res) => {
  const id = req.params.id;

  Data.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: 'Data deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to delete data' });
    });
});

// API route to send selected data to email
app.post('/api/send-email', (req, res) => {
  const { data } = req.body;

  // Logic to send email using nodemailer
  // Replace the SMTP transport details with your own
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: 'engineerbro20cs39@gmail.com',
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: 'engineerbro20cs39@gmail.com',
    to: 'info@redpositive.in',
    subject: 'Selected Data',
    text: JSON.stringify(data),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
