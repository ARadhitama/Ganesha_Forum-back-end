const db = require('../Datastore/config');

exports.makeComment = (payload) => {
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

exports.showComment = (id_post) => {
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

exports.deleteComment = (id) => {      // aman
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
