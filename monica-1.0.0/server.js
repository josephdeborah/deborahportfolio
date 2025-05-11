const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;
const subscribers = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// User subscribes
app.post('/subscribe', (req, res) => {
  const email = req.body.email;
  
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    console.log(`New subscriber: ${email}`);
  }
  res.send('Thank you for subscribing!');
});

// Admin sends newsletter
app.post('/admin/send', (req, res) => {
  const message = req.body.message;
  console.log(`Admin sent newsletter:\n${message}`);
  console.log('Sending to subscribers:', subscribers);

  // Simulated sending logic
  subscribers.forEach(email => {
    console.log(`Sent to ${email}: ${message}`);
  });

  res.send('Newsletter sent successfully!');
});

// Serve admin page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
