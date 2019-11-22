 const axios = require('axios')
// var cors = require('cors')
// const express = require('express');
// const app = express();
// app.use(cors());

function getTodos() {
    axios
      .get('localhost:9000/post/')
      .then(res => console.log(res))
      .catch(err => console.error(err));
}
  
  document.getElementById('get').addEventListener('click', getTodos);