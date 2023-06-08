const express = require('express');
const dotenv= require('dotenv').config();
const colors = require('colors')
const connectDB = require('./config/db')
const { errorHandler } = require("./middleware/errorMiddleware")
const port = process.env.PORT 


connectDB()
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(errorHandler)
app.use('/api/goals',require('./routes/goroute'))
app.use('/api/users',require('./routes/userRoutes'))


app.listen(port, () =>{
    console.log(`Server is on ${port}`);
})




