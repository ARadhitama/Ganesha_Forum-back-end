const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../Datastore/config');

function getPost() {
    return new Promise((resolve, reject) => {
        db.any('SELECT * FROM post')
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function getPostByID(id) {
    return new Promise((resolve, reject) => {
        db.any('SELECT * FROM post WHERE id = ' + id)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function makePost(payload){
    return new Promise((resolve, reject) => {
        const info = [
            payload.topik,
            payload.id_user,
            payload.title,
            payload.text,
            today = new Date()
        ]

        db.any('INSERT INTO user(topik, id_user, title, text, date) VALUES ($1, $2, $3, $4, $5) RETURNING *', info)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function deletePost(id_post) {
    return new Promise((resolve, reject) => {
        db.any(`DELETE FROM post WHERE id = ${id_post} AND id_user = ${id_user}`)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function addLikes(id_post) {
    return new Promise((resolve, reject) => {
        db.any(`UPDATE user SET like = like + 1 WHERE id = ${id_post} AND id_user = ${id_user} RETURNING *`)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function reportPost(id_post) {
    return new Promise((resolve, reject) => {
        db.any(`UPDATE post SET report = true WHERE id = ${id_post} AND id_user = ${id_user}`)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

router.get('/', async function(req,res) {
    try {
        const admin = await getPost();
        res.send(admin);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.post('/', async function(req,res) {
    try {
        const admin = await makePost(req.body);
        res.send(admin);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})
router.get('/:id', async function(req,res) {
    try {
        const admin = await getPostByID(req.params.id);
        res.send(admin);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.delete('/:id', async function(req,res) {
    try {
        const admin = await deletePost(req.params.id);
        res.send(admin);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.post('like/:id', async function(req,res) {
    try {
        const admin = await addLikes(req.params.id);
        res.send(admin);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.get('/report/:id', async function(req,res) {
    try {
        const admin = await reportPost(req.params.id);
        res.send(admin);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;