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
        const charCode = item.charCodeAt(0);
        if (highestLowercaseAlphabet === null || charCode > highestLowercaseAlphabet) {
          highestLowercaseAlphabet = charCode;
        }
      }
    }
  });

  let response = {};

  if (filter.includes('Numbers')) {
    response.Numbers = numbers.join(',');
  }

  if (filter.includes('Alphabets')) {
    response.Alphabets = alphabets.join(',');
  }

  if (filter.includes('Highest lowercase alphabet')) {
    response.HighestLowercaseAlphabet = highestLowercaseAlphabet;
  }

  console.log('Response:', response);
  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
