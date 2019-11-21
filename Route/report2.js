const express = require('express');
const router = express.Router();
const report = require('../Datastore/report2');
const createResponse = require('../Datastore/response');

router.get('/report/:user_id', async function(req,res) {
    try {
		const data = await report.getReportByID()
		/*report.getReportbyID(req.params.user_id);*/
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.delete('/report/:report_id', async function(req,res) {
    try {
        const data = await report.deleteReport(req.params.report_id);
        const result = createResponse(data, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.post('/report', async function(req,res) {
    try {
        const data = await report.makeReport(req.body);
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