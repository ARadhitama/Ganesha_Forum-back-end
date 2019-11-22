const express = require('express');
const router = express.Router();
const post = require('../Datastore/post2');
const createResponse = require('../Datastore/response');

router.get('/', async function(req,res) {
    try {
        const data = await post.getPost();
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.post('/', async function(req,res) {
    try {
        const data = await post.makePost(req.body);
		const result = createResponse(data, 200);
		console.log(req.body.text);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/:id', async function(req,res) {
    try {
        const data = await post.getPostByUserID(req.params.id);
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
        const data = await post.deletePost(req.params.id);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.put('/like/:id', async function(req,res) {
    try {
        const data = await post.addLikes(req.params.id);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

/* 
router.get('/report/:id', async function(req,res) {
    try {
        const post = await reportPost(req.params.id);
        res.send(post);
    }catch(err) {
        console.log(err);
        res.send(err);
    }
})
*/

router.get('/campuslife', async function(req,res) {
    try {
		topik = "campus life"
        const data = await post.filterPost(topik);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/academic', async function(req,res) {
    try {
		topik = "academic"
        const data = await post.filterPost(topik);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/lifestyle', async function(req,res) {
    try {
		topik = "lifestyle"
        const data = await post.filterPost(topik);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/entertainment', async function(req,res) {
    try {
		topik = "entertainment"
        const data = await post.filterPost(topik);
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