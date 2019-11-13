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

function deleteReport(report_id) {
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

router.get('/report/:user_id', async function(req,res) {
    try {
        const report = await getReportbyID(req.params.user_id);
        res.send(report);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.delete('/report/:reprot:id', async function(req,res) {
    try {
        const report = await deleteReport(req.params.report_id);
        res.send(report);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})

router.post('/report', async function(req,res) {
    try {
        const report = await makeReport(req.body, req.body);
        res.send(report);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
})