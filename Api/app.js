const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config();
const dbConnect = require('./config/mongo');
const  path  = require('path');


app.use(cors())
app.use(express.json())
app.use(express.static('storage'))
//swagger



const port = process.env.PORT || 8000


//ROUTES
app.use('/api', require('./routes'))
app.use(cors())

app.listen(port,() => {
    console.log('app lista')
})

dbConnect();