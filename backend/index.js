const express = require('express'); // Express is a web framework for Node.js.
const mongoose = require('mongoose'); // Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
const dotenv = require('dotenv'); // dotenv allows us to load environment variables from a .env file into process.env.
const cors = require('cors');

// Load environment variables from the .env file into process.env
dotenv.config(); 

// Initialize an Express application
const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));

// Get the port number from environment variables (defined in the .env file)
const port = process.env.PORT;

// Connect to MongoDB using Mongoose, with the connection URI stored in environment variables
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB')) 
.catch((err) => console.log('Failed to connect to MongoDB', err));  

// Use Express's built-in middleware to parse incoming JSON requests
app.use(express.json());

app.use("/api/user", require("./routes/UserRoutes"));
app.use("/api/mcq", require("./routes/McqRoutes"));

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
