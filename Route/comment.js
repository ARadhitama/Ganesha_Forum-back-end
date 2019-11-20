const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../Datastore/config');

function makeComment(payload){
    return new Promise((resolve, reject) => {
        const info = [
            payload.id_user,
            payload.text,
            payload.id_post,
            today = new Date()
        ]

        db.any('INSERT INTO comments(id_user, text, id_post, date) VALUES ($1, $2, $3, $4) RETURNING *', info)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function showComment(id_post) {
    return new Promise((resolve, reject) => {
        db.any('SELECT * FROM comments WHERE id_post = ' + id_post)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function deleteComment(id) {      // aman
    return new Promise((resolve, reject) => {
        db.any(`DELETE FROM comments WHERE id = ${id}`)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

router.get('/:id_post', async function(req, res) {
    try {
        const user = await showComment(req.params.id_post);
        res.send(user);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.post('/', async function(req, res) {
    try {
        const user = await makeComment(req.body);
        res.send(user);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.delete('/:id', async function(req,res) {
    try {
        const admin = await deleteComment(req.params.id);
        res.send(admin);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;