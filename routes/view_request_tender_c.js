var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('view_request_tender_c', { request_id: req.query.requestId });
});

module.exports = router;
