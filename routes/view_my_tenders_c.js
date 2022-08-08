var express = require('express');
var router = express.Router();
 
 router.get('/', function (req, res, next) {
    res.render('view_my_tenders_c', {});
});

module.exports = router;
