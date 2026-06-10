// Import the Express.js library
const express = require('express');

// Create an Express application
const app = express();

// Port number on which the server will run
const PORT = 3000;

// Define a route for the home page (/)
// When a user visits http://localhost:3000,
// this function sends "Hello World" as the response
app.get('/', (req, res) => {
    res.send('Hello World');
});


// Basic Routing
// Syntax: app.METHOD(PATH, HANDLER)
/* 
    HTTP request methods:
    1. get
    2. post
    3. put
    4. delete
    5. patch
*/

// GET: /user
app.get('/users', (req, res) => {
    res.send("Fetch List of Users.");
});

// POST: /user
app.post('/user', (req, res) => {
    res.send("Creating a POST request.");
});

// PUT: /user
app.put('/user', (req, res) => {
    res.send("Got a PUT request at /user.");
});

// DELETE: /user
app.delete('/user', (req, res) => {
    res.send("Got a DELETE request at /user.");
});


// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});