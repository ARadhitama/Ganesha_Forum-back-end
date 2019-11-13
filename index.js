require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require ('body-parser');1
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', require('./Route/user'));
app.use('/', require('./Route/report'));

const start = async () => {
    try {
        const localhost = await app.listen(process.env.PORT);
        console.info(`Server running on ${localhost.address().port}`);
    } catch(err) {
        console.error(err);
    }
}

start();