var express = require('express');
var router = express.Router();
 
 router.get('/', function (req, res, next) {
    res.render('view_tenders_m', {});
});

module.exports = router;
