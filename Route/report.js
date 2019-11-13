const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../Datastore/config');
var today = new Date();

function makeReport(user_id, description) {
    return new Promise((resolve, reject) => {
        db.any('INSERT INTO report(user_id, description) VALUES ($1, $2)', [user_id, description])
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function getReportbyID(user_id) {
    return new Promise((resolve, reject) => {
        db.any('SELECT * FROM report WHERE user_id = %1', user_id)
            .then(data => {
                resolve(data);
            })
            .catch(data => {
                reject(err);
            })
    })
}

