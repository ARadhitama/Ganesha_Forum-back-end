const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../Datastore/config');
var today = new Date();

function getUser() {    // aman 
    return new Promise((resolve, reject) => {
        db.any('SELECT user_id, email, status_admin, date_created, status_ban FROM users')
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function getUserbyID(user_id) { // aman
    return new Promise((resolve, reject) => {
        db.any('SELECT user_id, email, status_admin, date_created, status_ban FROM users WHERE user_id = $1', [user_id])
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}   

function makeUser(payload) {    // aman
    return new Promise((resolve,reject) => {
        const data = [      
            payload.email,
            payload.password,
            false,
            today,
            false
        ]
        db.any('INSERT INTO users(email, password, status_admin, date_created, status_ban) VALUES ($1, $2, $3, $4, $5)', data)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function banUser(user_id, status_ban) {
    return new Promise((resolve, reject) => {
        db.any('UPDATE users SET status_ban = $1 WHERE user_id = $2', [user_id, status_ban])
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })      
    })
}

function setAdmin(user_id, status_admin) {
    return new Promise((resolve, reject) => {
        db.any('UPDATE users set status_admin = $1 WHERE user_id = $2', [user_id, status_admin])
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function getAdmin() {       // aman
    return new Promise((resolve, reject) => {
        db.any('SELECT user_id, email, date_created FROM users WHERE status_admin = $1', [true])
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

router.get('/user', async function(req, res) {
    try {
        const user = await getUser();
        res.send(user);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.get('/user/:user_id', async function(req, res) {
    try {
        const user = await getUserbyID(req.params.user_id);
        res.send(user);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})


router.post('/user', async function(req, res) {
    try {
        const user = await makeUser(req.body);
        res.send(user);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.put('/user/:user_id/:status_ban', async function (req, res) {
    try{
        const user = await banUser(req.params.user_id, req.params.status_ban);
        res.send(user);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.put('/admin/:user_id/:status_admin', async function(req,res) {
    try {
        const admin = await setAdmin(req.params.user_id, req.params.status_admin);
        res.send(admin);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.get('/admin', async function(req,res) {
    try {
        const admin = await getAdmin();
        res.send(admin);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;