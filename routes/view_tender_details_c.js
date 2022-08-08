var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('view_tender_details_c', { tender_id: req.query.bindingId })
});

module.exports = router;
