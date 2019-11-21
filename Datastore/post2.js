const db = require('./config');

exports.getPost = () => {        // aman
    return new Promise((resolve, reject) => {
        db.any('SELECT * FROM posts ORDER BY date')
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getPostByUserID = (id) => {      // aman
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

exports.makePost = (payload) => {     // aman
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

exports.deletePost = (id_post) => {      // aman
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

exports.addLikes = (id_post) => {        // aman
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
/*
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
*/
exports.filterPost = (payload) => {
    return new Promise((resolve, reject) => {
        const data = [
            payload.topik
        ]
        db.any('SELECT * FROM posts WHERE topik = $1', data)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}
