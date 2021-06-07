const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
//routes
const movies = require('./routes/api/movies');

const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use(cors({ origin: true, credentials: true }));


// use Routes
app.use('/api/movies', movies);

app.get('/',(req,res)=>res.send("Hello World"));

const port = process.env.PORT || 8082;

app.listen(port,()=>console.log(`Server Up and Running on Port ${port}`));