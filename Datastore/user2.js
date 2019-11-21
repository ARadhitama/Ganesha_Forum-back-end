const db = require('../Datastore/config');
var today = new Date();

exports.getUser = () => {    // aman 
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

exports.getUserbyID = (user_id) => { // aman
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

exports.makeUser = (payload) => {    // aman
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

exports.banUser = (payload) => {     // aman
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

exports.setAdmin = (payload) => {        // aman
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

exports.getAdmin = () =>{       // aman
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