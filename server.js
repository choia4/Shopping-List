const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');


const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', items);

//serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const indexPath = path.join(__dirname, './index.html')
const distPath = express.static(path.join(__dirname, './dist'))

app.use('/dist', distPath)
app.get('/', function (req, res) { res.sendFile(indexPath) }) 

const port = process.env.PORT || 5000;

app.listen(port, () => console.log( `Server started on port ${port}`));