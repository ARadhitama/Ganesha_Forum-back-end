const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../Datastore/config');
var today = new Date();

function getUser() {
    return new Promise((resolve, reject) => {
        db.any('SELECT user_id, email, status_admin, date_created, status_ban FROM user')
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function getUserbyID(user_id) {
    return new Promise((resolve, reject) => {
        db.any('SELECT user_id, email, status_admin, date_created, status_ban FROM user WHERE user_id = $1', user_id)
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}   

function makeUser(email,password) {
    return new Promise((resolve,reject) => {
        db.any('INSERT INTO user(email, password, status_admin, date_created, status_ban) VALUES ($1, $2, $3, $4, $5)', [email, password, false, today, false])
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function banUser(status_ban, user_id, ) {
    return new Promise((resolve, reject) => {
        db.any('UPDATE user SET status_ban = $1 WHERE user_id = $2', [status_ban, user_id])
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function setAdmin(status_admin, user_id) {
    return new Promise((resolve, reject) => {
        db.any('UPDATE user set status_admin = $1 WHERE user_id = $2', [status_admin, user_id])
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function getAdmin() {
    return new Promise((resove, reject) => {
        db.any('SELECT user_id, email, date_created FROM user')
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                reject(err);
            })
    })
}

