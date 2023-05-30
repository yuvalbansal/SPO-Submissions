const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// Initialize Firebase admin SDK
const serviceAccount = require('AIzaSyAkwgRDFanB82EPWlwVYwQnbYWFqQbBI0k'); // Replace with your own service account key file
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://console.firebase.google.com/project/spo-task3/database/spo-task3-default-rtdb/data/~2F' // Replace with your own Firebase Realtime Database URL
});

const app = express();
const port = 8080;

app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        const { userId, password } = req.body;

        // Generate a salt and hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save the user credentials to the Firebase Realtime Database
        await admin.database().ref('users/' + userId).set({
            userId,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { userId, password } = req.body;

        // Retrieve the hashed password from the Firebase Realtime Database
        const snapshot = await admin.database().ref('users/' + userId).once('value');
        const user = snapshot.val();

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            // Compare the provided password with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
