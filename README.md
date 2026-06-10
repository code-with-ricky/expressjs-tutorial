# Express.js Tutorial

## Installation

- First install `Node.js v18` or higher.
- Create a directory and navigate into it.

```bash
mkdir myapp
cd myapp
```

- Create a `package.json` file for your application using the command below:

```bash
npm init
```

- It prompts a few questions. You can press ENTER to select the default values.
- The default entry point is `index.js`. You can change it to `app.js` or any other filename you prefer.

```bash
entry point: (index.js)
```

- Install `express` in the `myapp` directory and save it to the dependency list.

```bash
npm install express

# or

npm i express
```

- If you want to install `express` temporarily and not add it to the dependency list, run the following command:

```bash
npm install express --no-save
```

---

## Basic App setup and Hello World
Create a file named `app.js` and add the following code:

```javascript
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

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
```

Run the application using the following command:

```bash
node app.js
```

You should see the following output:

```text
Server running at port 3000
```

Open your browser and visit:

```text
http://localhost:3000
```

The browser will display:

```text
Hello World
```

### Notes

- `express()` creates a new Express application instance.
- `app.get()` defines a route that handles HTTP GET requests.
- `/` represents the root (home) route of the application.
- `req` contains information about the incoming request from the client.
- `res` is used to send a response back to the client.
- `res.send()` sends a response to the client.
- `app.listen()` starts the server and listens for incoming requests.
- `PORT` specifies the port number on which the application runs.
- By default, the application will be accessible at `http://localhost:3000`.

---

## Basic Routing

Routing refers to how an application responds to a client request for a specific URL (endpoint) and HTTP method.

In Express, routes are defined using the following syntax:

```javascript
app.METHOD(PATH, HANDLER);
```

Where:

- `app` is an instance of the Express application.
- `METHOD` is an HTTP request method such as `get`, `post`, `put`, or `delete`.
- `PATH` is the URL path on which the route will be matched.
- `HANDLER` is a callback function that executes when the route is matched.

### HTTP Request Methods

HTTP defines several request methods that indicate the action to be performed on a resource.

| Method | Purpose | Example |
|----------|---------|---------|
| GET | Retrieve data from the server | Fetch a list of users |
| POST | Create a new resource | Add a new user |
| PUT | Replace an existing resource completely | Update all user details |
| PATCH | Partially update an existing resource | Update only a user's email |
| DELETE | Remove a resource | Delete a user |
| HEAD | Retrieve response headers without the response body | Check if a resource exists |
| OPTIONS | Retrieve supported HTTP methods for a resource | Check allowed operations on `/users` |

### Route Examples

The following example demonstrates how to create routes for different HTTP methods:

```javascript
// GET: /users
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
```

### Testing the Routes

You can test these routes using:

- Browser (for GET requests)
- Postman
- Insomnia
- cURL
- Thunder Client (VS Code Extension)

Examples:

```http
GET    http://localhost:3000/users
POST   http://localhost:3000/user
PUT    http://localhost:3000/user
DELETE http://localhost:3000/user
```

### Notes

- Route paths are case-sensitive by default.
- A route is matched only when both the URL path and HTTP method match.
- `req` contains information sent by the client.
- `res` is used to send a response back to the client.
- Multiple routes can exist for the same path as long as they use different HTTP methods.
- REST APIs commonly use `GET`, `POST`, `PUT`, and `DELETE` to perform CRUD (Create, Read, Update, Delete) operations.

---
## Serving Static Files

Static files are files that are sent directly to the client without any server-side processing. Common examples include:

- Images (`.jpg`, `.png`, `.gif`, `.svg`)
- CSS files (`.css`)
- JavaScript files (`.js`)
- Videos (`.mp4`, `.webm`)
- Documents (`.pdf`)

Express provides a built-in middleware called `express.static()` to serve static files.

### Syntax

```javascript
express.static(root, [options]);
```

Where:

- `root` is the directory from which static files will be served.
- `options` is an optional configuration object.

### Serving Files from a Directory

Suppose you have the following project structure:

```text
myapp/
├── app.js
└── public/
    ├── images/
    │   └── kitten.jpg
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

To serve files from the `public` directory:

```javascript
app.use(express.static('public'));
```

Now the files can be accessed directly through the browser:

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/script.js
```

> **Note:** Express looks for files relative to the static directory, so `public` does not appear in the URL.

### Using Multiple Static Directories

You can serve static files from multiple directories:

```javascript
app.use(express.static('files'));
app.use(express.static('images'));
```

Express searches the directories in the order they are registered.

### Creating a Virtual Path Prefix

A virtual path prefix allows you to expose a directory under a custom URL path.

```javascript
app.use('/static', express.static('videos'));
```

Now files inside the `videos` directory can be accessed using:

```text
http://localhost:3000/static/myvideo.mp4
```

### Using an Absolute Path

The path provided to `express.static()` is relative to the directory from which the Node.js process is started.

To avoid path-related issues, use an absolute path:

```javascript
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
```

### Notes

- `express.static()` is built-in middleware provided by Express.
- Static files are served directly without defining routes.
- Multiple static directories can be registered using multiple `app.use()` calls.
- Virtual path prefixes help organize URLs without changing folder names.
- Using `path.join(__dirname, ...)` is recommended for better portability across environments.
- For production applications, a reverse proxy such as Nginx is commonly used to improve static file performance and caching.