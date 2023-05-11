const express = require('express');
const mysql = require('mysql');
const liff = require('@line/liff');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
});

db.connect(function(err) {
  if (err) throw err;
  console.log('Connected to the database!');
});

const app = express();

// Use body-parser middleware to parse json and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const lineUserId = req.body.lineUserId; // This should be sent from your frontend after LINE login

    // Verify the email and get the User ID from your database
    db.query('SELECT * FROM users WHERE email = ?', [email], function(err, results) {
        if (err) throw err;

        if (results.length > 0) {
            const userId = results[0].id;

            // Link the User ID and LINE User ID
            db.query('UPDATE users SET line_user_id = ? WHERE id = ?', [lineUserId, userId], function(error, results, fields) {
                if (error) throw error;
                
                // User ID and LINE User ID have been linked
                res.json({ message: 'User ID and LINE User ID have been linked' });
            });
        } else {
            res.status(401).json({ message: 'Email not found' });
        }
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

