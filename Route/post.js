const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../Datastore/config');

function getPost() {        // aman
    return new Promise((resolve, reject) => {
        db.any('SELECT * FROM posts')
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
        db.any('SELECT * FROM posts WHERE id_user = ' + id)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function makePost(payload){     // aman
    return new Promise((resolve, reject) => {
        const info = [
            payload.topik,
            0,
            payload.id_user,
            payload.title,
            payload.text,
            today = new Date()
        ]

        db.any('INSERT INTO posts(topik, likes, id_user, title, text, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', info)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function deletePost(id_post) {      // aman
    return new Promise((resolve, reject) => {
        db.any(`DELETE FROM posts WHERE id = ${id_post}`)
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
        db.any(`UPDATE posts SET likes = likes + 1 WHERE id = ${id_post}`)
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
        db.any(`UPDATE posts SET report = true WHERE id = ${id_post}`)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function filterPost(topik) {
    return new Promise((resolve, reject) => {
        db.any(`SELECT * FROM posts WHERE topik = ${topik}`)
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

router.put('/like/:id', async function(req,res) {
    try {
        const admin = await addLikes(req.params.id);
        res.send(admin);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

/* 
router.get('/report/:id', async function(req,res) {
    try {
        const admin = await reportPost(req.params.id);
        res.send(admin);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})
*/

router.get('/filter/', async function(req,res) {
    try {
        const admin = await filterPost(req.body.topik);
        res.send(admin);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;