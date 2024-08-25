const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/bfhl', (req, res) => {
    console.log('Request Body:', req.body);

    const { data, filter } = req.body;

    // Ensure data is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else {
            alphabets.push(item);
            if (/^[a-z]$/.test(item)) {
                if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    // Prepare response
    let response = {
        is_success: true,
        user_id: 'Vecha Sai Badarinadh', // Your full name and DOB in format ddmmyyyy
        email: 'vechasaibadarinadhemail@.com', // Your actual email
        roll_number: '21BCE7084', // Your actual roll number
    };

    if (filter.includes('Numbers')) {
        response.Numbers = numbers;
    }

    if (filter.includes('Alphabets')) {
        response.Alphabets = alphabets;
    }

    if (filter.includes('Highest lowercase alphabet')) {
        response.HighestLowercaseAlphabet = highestLowercaseAlphabet ? highestLowercaseAlphabet : null;
    }

    console.log('Response:', response);
    res.json(response);
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
