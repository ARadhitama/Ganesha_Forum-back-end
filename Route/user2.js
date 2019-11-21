const express = require('express');
const router = express.Router();
const user = require('../Datastore/user2');
const createResponse = require('../Datastore/response');

router.get('/user', async function(req, res) {
    try {
        const data = await user.getUser();
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/user/:user_id', async function(req, res) {
    try {
        const data = await user.getUserbyID(req.params.user_id);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})


router.post('/user', async function(req, res) {
    try {
        const data = await user.makeUser(req.body);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.put('/user', async function (req, res) {
    try{
        const data = await user.banUser(req.body);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.put('/admin', async function(req,res) {
    try {
        const data = await user.setAdmin(req.body);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/admin', async function(req,res) {
    try {
        const data = await user.getAdmin();
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

module.exports = router;