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

function banUser(payload) {     // aman
    return new Promise((resolve, reject) => {
        const data = [
            payload.user_id,
            payload.status_ban
        ]
        db.any('UPDATE users SET status_ban = $2 WHERE user_id = $1', data)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })      
    })
}

function setAdmin(payload) {        // aman
    return new Promise((resolve, reject) => {
        const data = [
            payload.user_id,
            payload.status_admin
        ]
        db.any('UPDATE users set status_admin = $2 WHERE user_id = $1', data)
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

router.put('/user', async function (req, res) {
    try{
        const user = await banUser(req.body);
        res.send(user);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.put('/admin', async function(req,res) {
    try {
        const admin = await setAdmin(req.body);
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