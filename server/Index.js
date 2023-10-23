const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const crypto = require('crypto');
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Database or data store for OTP verification
const users = new Map();

app.get('/', (req, res) => {
    res.send(`
    <form method="POST" action="/register">
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" required><br>
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" required><br>
      <button type="submit">Register</button>
    </form>
  `);
});

app.post('/register', (req, res) => {
    const { name, email } = req.body;

    // Generate a unique OTP for the user
    const otp = generateOTP();

    // Store the user data and OTP
    users.set(email, { name, otp });

    // Send the OTP via email
    sendOTPByEmail(email, otp);

    res.send('Check your email for OTP verification.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function generateOTP() {
    return Math.random().toString(36).slice(2, 8);
}

function sendOTPByEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'silva12akash@gmail.com',
            pass: 'a1k1a1s1h1',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


// ---------------  Generate OTP -----------------------------------

app.post('/generate-otp', async (req, res) => {
    try {
        const { name, email } = req.body;


        const otp = generateOTP();


        users.set(email, { name, otp });
        sendOTPByEmail(email, otp);

        if (name === "" || email == "") {
            console.log("Please enter required field")
            return res.status(400).json({ error: 'Please enter required field' });
        }
        else {
            res.status(200).send('OTP sent successfully. Check your email for OTP verification.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('OTP generation and email sending failed.');
    }
});





app.get('/verify/:email', (req, res) => {
    const email = req.params.email;
    const userData = users.get(email);

    if (!userData) {
        res.send('User not found.');
    } else {
        res.send(`
        <form method="POST" action="/verify/${email}">
          <label for="otp">Enter OTP:</label>
          <input type="text" name="otp" id="otp" required><br>
          <button type="submit">Verify OTP</button>
        </form>
      `);
    }
});

app.post('/verify/:email', (req, res) => {
    const email = req.params.email;
    const { otp } = req.body;
    const userData = users.get(email);

    if (userData && userData.otp === otp) {
        res.send('Email verified successfully.');
    } else {
        res.send('Invalid OTP. Please try again.');
    }
});



// ------------------------ Topic Form Handling -------------------------------------


app.post('/topics', (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Topic text is required.' });
    }
    const newTopic = {
        id: 1, 
        text,
    
    };

    res.status(201).json(newTopic);
});















