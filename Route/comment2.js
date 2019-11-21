const express = require('express');
const router = express.Router();
const comment = require('../Datastore/comment2');
const createResponse = require('../Datastore/response');

router.get('/:id_post', async function(req, res) {
    try {
        const data = await comment.showComment(req.params.id_post);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.post('/', async function(req, res) {
    try {
        const data = await comment.makeComment(req.body);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.delete('/:id', async function(req,res) {
    try {
        const data = await comment.deleteComment(req.params.id);
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