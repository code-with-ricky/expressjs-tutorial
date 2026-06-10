// Import the Express.js library
const express = require('express');

// Create an Express application
const app = express();

// Port number on which the server will run
const PORT = 3000;


// Serving static files
// to server static files like images, CSS files, JavaScript files etc
// use built-in express middleware --> express.static
// syntax: express.static(root, [options]);
// root --> this argument specifies root directory from which static assets are to be served
// supporse want to server assets from 'public' directory
app.use(express.static('public'));

// now you can load files that are in public directory
// example:
// http://localhost:3000/images/kitten.jpg
// http://localhost:3000/css/style.css
// http://localhost:3000/images/script.js

// Note: express looks for files relative to static directory, so 'public' is not there in the path

// use multiple directories for static files
app.use(express.static('files'));
app.use(express.static('images'));

// Note: For best results, use a reverse proxy cache to improve performance of serving static assets.

// create a virtual path prefix
app.use('/static', express.static('videos'));

/*
    Now path becomes:
    http://localhost:3000/static/myvide.mp4
*/


/*

    However, the path that you provide to the express.static function is relative to the directory from where you launch your node process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
*/
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


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