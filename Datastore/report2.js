const db = require('../Datastore/config');
var today = new Date();

exports.makeReport = (payload) => {  // aman
    return new Promise((resolve, reject) => {
        const data = [
            payload.user_id,
            payload.description,
            today
        ]
        db.any('INSERT INTO report(user_id, description, date) VALUES ($1, $2, $3)', data)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.getReportbyID = (user_id) => {       // aman
    return new Promise((resolve, reject) => {
        db.any('SELECT * FROM report WHERE user_id = $1', [user_id])
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.deleteReport = (report_id) => {     // aman
    return new Promise((resolve, reject) => {
        db.any('DELETE FROM report WHERE report_id = $1', report_id)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);    
            })
    })
}