var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
res.render('view_tender_result_c',{tender_id:req.query.bindingId})
});

module.exports = router;
