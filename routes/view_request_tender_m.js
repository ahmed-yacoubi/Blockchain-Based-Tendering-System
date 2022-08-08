var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
res.render('view_request_tender_m',{request_id:req.query.requestId})
});

module.exports = router;
