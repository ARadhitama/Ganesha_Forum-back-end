require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', require('./Route/user'));
app.use('/', require('./Route/report'));
app.use('/post', require('./Route/post'));
app.use('/comment', require('./Route/comment'));

const start = async () => {
    try {
        const localhost = await app.listen(process.env.PORT);
        console.info(`Server running on ${localhost.address().port}`);
    } catch(err) {
        console.error(err);
    }
}

start();